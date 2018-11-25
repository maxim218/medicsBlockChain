"use strict";

const shim = require('fabric-shim');
const util = require('util');

let Code = class {
    async Init(stub) {
        return shim.success();
    }

    async Invoke(stub) {        
        let ret = stub.getFunctionAndParameters();
        let method = this[ret.fcn];
        if (!method) {
            throw new Error("");
        }
        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            return shim.error(err);
        }
    }

    async initLedger(stub, args) {
        const BASE = {
            doctors: [],
            patients: [],
            diagnoses: [],
        };

        await stub.putState('BASE', Buffer.from(JSON.stringify(BASE)));

        return Buffer.from(JSON.stringify({
            result: "INIT_LEDGER_OK",
        }));
    }

    async getAllBase(stub, args) {
        const baseString = await stub.getState('BASE');
        return Buffer.from(baseString.toString());
    }

    async addToBase(stub, args) {
        const obj = JSON.parse(args[0].toString());
        const type = obj.type.toString();

        const baseString = await stub.getState('BASE');
        const BASE = JSON.parse(baseString.toString());

        if(type === "addDoctor") {
            const name = obj['name'].toString();
            const job = obj['job'].toString();
            BASE.doctors.push({
               name: name,
               job: job,
            });
        }

        if(type === "addPatient") {
            const name = obj['name'].toString();
            const age = obj['age'].toString();
            const gender = obj['gender'].toString();
            BASE.patients.push({
                name: name,
                age: age,
                gender: gender,
            });
        }

        if(type === "addDiagnose") {
            const doctorID = obj['doctorID'].toString();
            const patientID = obj['patientID'].toString();
            const diagnose = obj['diagnose'].toString();
            BASE.diagnoses.push({
                doctorID: doctorID,
                patientID: patientID,
                diagnose: diagnose,
            });
        }

        await stub.putState('BASE', Buffer.from(JSON.stringify(BASE)));

        return Buffer.from(JSON.stringify({
            result: "ADDING_OK",
        }));
    }
};

shim.start(new Code());
