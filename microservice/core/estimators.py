from core.datatypes import Dataset
from core.utils import datasetGuard
from core.constants import DEFAULT_OFFSET
import time
import numpy as np

def optimize_gain (data, time, center, amplitude):
  alpha = 100
  omega = 0.98
  maxsteps = 1000
  memory = 0

  gain_array = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000]
  cost_array = []
  for g in gain_array:
    cost_array.append(compute_cost(data, time, center, amplitude, g))

  gain = gain_array[np.argmin(cost_array)]
  epsilon = 1e-4
  cost = compute_cost(data, time, center, amplitude, gain)

  #for step in range(maxsteps):
  for _ in range(maxsteps):
    # print('Step %d with cost %.4f' % (step + 1, cost))
    delta = (compute_cost(data, time, center, amplitude, gain + epsilon) - cost) / epsilon
    memory = omega * memory + delta
    gain -= alpha * memory
    cost = compute_cost(data, time, center, amplitude, gain)
  
  # print('Final step with cost %.4f' % (cost))
  return gain

def optimize_gain_naive(data, time, center, amplitude):
  maxsteps = 10
  divisions = 50
  min_gain = -20000
  max_gain = 20000
  gain = 1000

  for step in range(maxsteps):
    gain_vector = np.linspace(min_gain, max_gain, divisions)
    cost_vector = [compute_cost(data, time, center, amplitude, g) for g in gain_vector]
    argmin = np.argmin(cost_vector)
    step_size = gain_vector[1] - gain_vector[0]
    gain = gain_vector[argmin]
    cost = cost_vector[argmin]
    min_gain = gain - 4 * step_size
    max_gain = gain + 4 * step_size
    print('Iteration %d with cost %.8e and gain %.8f and stepsize %.4e' % (step+1, cost, gain, step_size))
  
  return gain


def compute_cost (data, time, center, amplitude, gain):
  if gain <= 0:
    return np.Inf
  projection = amplitude * np.exp( -((time - center) ** 2) / gain )
  error = data - projection
  return np.sum(error ** 2)

def estimate_best_gauss_like (dataset, reference, wsize=1):
  """
  Estima a melhor função do tipo gaussiana para filtrar o sinal
  convolucionado.
  """
  datasetGuard(dataset)
  min_idx = np.argmin(dataset.data[wsize:-wsize]) + wsize
  center = dataset.time[min_idx]
  amplitude = dataset.data[min_idx]

  data_sample = dataset.data[min_idx-wsize:min_idx+wsize+1]
  time_sample = dataset.time[min_idx-wsize:min_idx+wsize+1]

  gain = optimize_gain_naive(data_sample, time_sample, center, amplitude)
  print('Got optimal gain at %.4f' % gain)

  ref_idx = np.argwhere(reference.time == center)[0][0]
  ref_val = reference.data[ref_idx]
  return { 'center': center, 'amplitude': amplitude, 'gain': gain, 'reference': ref_val, 'material': None }