const assert = require('assert');
const Assertion = require('assert').AssertionError;
const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3 = new Web3(provider);

const { interface, bytecode } = require('../scripts/compile');

let accounts;
let usersContract;

beforeEach(async() => { 
    accounts = await web3.eth.getAccounts();
    usersContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode})
        .send({ from: accounts[0], gas: '1000000'});
});

describe('The UserContract', async() => {

    it('should deploy', () => {
        console.log(usersContract.options.address);
        assert.ok(usersContract.options.address);
    });

    it('should join a user', async () => {
        let name = "Francisco";
        let surname = "Medrano";

        await usersContract.methods.join(nane, surname)
            .send ({from : accounts[0], gas: '500000'});
    });

    it ('shouf retreive a user', async() => {
        let name = "Francisco";
        let surname = "Medrano";

        await usersContract.methods.join(nane, surname)
            .send ({from : accounts[0], gas: '500000'});

        let user = await usersContract.methods.getUsers(accounts[0]).call();

        assert.equal(name, user [0]);
        assert.equal(surname, user[1]);
    });

    it ('shold not allows joining an account twice', async() => {

        await usersContract.methods.join("Pedro", "Lopez")
        .send ({from : accounts[0], gas: '500000'});
    
        try {
        await usersContract.methods.join("Ana", "Gomez")
        .send ({from : accounts[0], gas: '500000'});
        assert.fail('same account cant join twice');
        } 
        catch(e) {
            if (e instanceof AssertionError) {
                assert.fail(e.message);            }

        }

    });


});