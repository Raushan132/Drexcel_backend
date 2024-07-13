const mongoose = require('mongoose');

const FingerprintSchema = new mongoose.Schema({
    AnsiTemplate: {
        type: String,
        required: true,
    },
    BitmapData: {
        type: String,
        required: true,
    },
    Bpp: {
        type: Number,
        default: 8,
    },
    ErrorCode: {
        type: String,
        default: "0",
    },
    ErrorDescription: {
        type: String,
        default: "",
    },
    GrayScale: {
        type: Number,
        default: 256,
    },
    InArea: {
        type: Number,
        default: 0.45,
    },
    InHeight: {
        type: Number,
        default: 0.71,
    },
    InWidth: {
        type: Number,
        default: 0.63,
    },
    IsoImage: {
        type: String,
        required: true,
    },
    IsoTemplate: {
        type: String,
        required: true,
    },
    Nfiq: {
        type: Number,
        default: 1,
    },
    Quality: {
        type: Number,
        default: 84,
    },
    RawData: {
        type: String,
        required: true,
    },
    Resolution: {
        type: Number,
        default: 500,
    },
    WSQCompressRatio: {
        type: Number,
        default: 10,
    },
    WSQInfo: {
        type: String,
        default: "WSQ encoding",
    },
    WsqImage: {
        type: String,
        required: true,
    },
});

const StudentModuleSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
    },
    batchName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    disable:{
        type: Boolean,
        default: false
    },
    userId:{
        type:String
    },
    fingerprints: [FingerprintSchema],
});

module.exports = mongoose.model('Students', StudentModuleSchema);
