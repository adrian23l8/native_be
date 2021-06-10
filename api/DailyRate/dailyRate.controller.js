var dailyRate = require('./dailyRate.service');

const Validator = require('fastest-validator');
const valid = new Validator();
const schema = {
    giaMoiTuan: { 
        type: 'number', min: 10, 
        messages: {
            required: "Phải nhập giá!",
            number: "Giá phải là số!",
            numberMin: "Giá Phải lớn hơn 10$!"
        }
    }
}
const check = valid.compile(schema);

module.exports = {
    index: (req, res) => {
        dailyRate.getAll((err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        })
    },
    show: (req, res) => {
        id = req.params.id;
        dailyRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists!'); }
            return res.status(200).json(result);
        })
    },
    store: (req, res) => {
        const data = req.body;
        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        dailyRate.createData(data, (err, result) => {
            if(err) { return res.status(500).json(err); }
            return res.status(200).json(result);
        });
    },
    update: (req, res) => {
        const id = req.params.id;
        const data = req.body;
        var constraint = check(data);
        if(constraint !== true) return res.status(400).json(constraint);
        dailyRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists to update!'); }
            dailyRate.updateData(id, data, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Updated successfully");
            })            
        })
    },
    destroy: (req, res) => {
        const id = req.params.id;

        dailyRate.getDataByID(id, (err, result) => {
            if(err) { return res.status(500).json(err); }
            if(result.length <= 0) { return res.status(400).json('Record not exists to delete!'); }
            dailyRate.deleteData(id, (err, result) => {
                if(err) { return res.status(500).json(err); }
                return res.status(200).json("Delete successfully");
            })            
        })
        
    }
};