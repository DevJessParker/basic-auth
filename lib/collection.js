'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (err) {
      console.error('Could not create record')
    }
  }

  async read(id, options = {}) {
    try {
      let records = null

      if(id) {
        options['where'] = { id };
        records = await this.model.findOne(options) 
      } else {
        records = await this.model.findAll(options);
      }
      return records;
    } catch(err) {
      console.error('could not retrieve resource')
    }
  }

  async update(id, json) {
    try {
      if (!id) throw new Error('no id provided');
      let record = await this.model.findOne({ where: { id } });
      let updatedRecord = await record.update(json);
      return updatedRecord;
    } catch(err) {
      console.error('could not update item')
    }
  }

  async delete(id) {
    try {
      if (!id) throw new Error('No id provided. Cannot delete item.');
      let deletedRecord = await this.model.destroy({ where: { id }});
      return deletedRecord;
    } catch(err) {
      console.error('Could not delete item')
    }
  }
}

module.exports = Collection;