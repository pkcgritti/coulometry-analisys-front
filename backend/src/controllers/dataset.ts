import { GET, POST, DELETE } from '../decorators/router';
import { Controller } from './base/controller';
import Repositories from '../repositories';
import axios from 'axios';
import { Types } from 'mongoose';

export class DatasetController extends Controller {
  @GET('/')
  listDatasets () {
    return Repositories.Dataset.find({}, {
      name: 1,
      processed: 1,
      material: 1,
      uploaded: 1
    });
  }

  @GET('/:id', req => [req.params.id])
  getDataset (id) {
    return Repositories.Dataset.findOne({
      _id: Types.ObjectId(id)
    })
  }

  // Change to PUT
  @GET('/:id/addpoint', req => [req.params.id])
  addPoint (id) {
    return axios.get('http://localhost:8001/add_point?id=' + id)
      .then(response => {
        return Repositories.Dataset.updateOne({
          _id: Types.ObjectId(id)
        }, {
          $push: {
            results: response.data
          }
        }).then(() => {
          return response.data
        })
      })
      .catch(error => {
        console.log('Error', error.response.data)
        return {}
      })
  }

  @GET('/:id/removepoint', req => [req.params.id])
  removePoint (id) {
    return Repositories.Dataset.updateOne({
      _id: Types.ObjectId(id)
    }, {
      $pop: {
        results: 1
      }
    })
  }

  @GET('/:id/togglepoint/:index', req => [req.params.id, req.params.index])
  togglePoint (id, index) {
    const query = { _id: Types.ObjectId(id) }
    const number = Number.parseInt(index)
    return Repositories.Dataset.findOne(query)
      .then(dataset => {
        let ignore = dataset.ignore
        if (dataset.ignore.indexOf(number) > -1) {
          ignore = dataset.ignore.filter(x => x !== number)
        } else {
          ignore.push(number)
        }
        return Repositories.Dataset.updateOne(query, { $set: { ignore } })
      })
  }

  @POST('/', req => [req.body])
  createDataset (dataset) {
    return Repositories.Dataset.createOne(dataset)
  }

  @DELETE('/:id', req => [req.params.id])
  deleteDataset (id) {
    return Repositories.Dataset.deleteOne({
      _id: Types.ObjectId(id)
    });
  }
};