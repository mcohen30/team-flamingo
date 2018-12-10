import React, { Component } from "react";
import "./App.css";
import Select from "react-select";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import $ from 'jquery'; 
import jquery from 'jquery';
import jQuery from "jquery";
let Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("https://wallrpc.pirl.io"));

// Nahom - 0xA32dA866506b40235B937A4f94E14708E74F1c83
// James - 0x66502fB281a63015c80F25A0D3821c763F1Df700

function getBalance(addr){
	return web3.fromWei(web3.eth.getBalance(addr), "ether") / 1;
}


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function createJsonForInput(index, contractABIString){
		if(IsJsonString(contractABIString) === true){
			var contractABI = JSON.parse(contractABIString);
			var list = [];
			var i = 0;

			for(i = 0; i < contractABI[index].inputs.length; i++){
				
					const item = {};
					item["label"] = contractABI[index].inputs[i].name;
					item["index"] = i;
					if (contractABI[index].inputs[i].type.includes("uint")){
						item["value"] = 0;
					}
					else{
						item["value"] = "";
					}
					list.push(item);
				
			}
			return list;
		}
		else{
			return [];
		}

}


function createJsonForList(contractABIString){
	if(IsJsonString(contractABIString) === true){
		var contractABI = JSON.parse(contractABIString);
		console.log("The contractABI");
		console.log(contractABI);
		var list = [];
		var i = 0;

		for(i = 0; i < contractABI.length; i++){
			if (contractABI[i].type === "function"){
				const item = {};
				item["value"] = contractABI[i].name;
				item["index"] = i;
				item["label"] = contractABI[i].name;
				item["link"] = "C1";
				list.push(item);
			}
		}
		return list;
	}
	return [];
}

function connectContractEth(abi, addr){
	var contractOneSpec = web3.eth.contract(abi);
	var sContractOne = contractOneSpec.at(addr);
	return sContractOne;
}

//aAddr stands for account address
function executeFunc(i, abi, cAddr, aAddr, input) {
	console.log("The account address is:");
	console.log(aAddr);
	console.log("the contract addr is:");
	console.log(cAddr);
	console.log("the abi is:");
	console.log(abi);
	var contract = connectContractEth(abi, cAddr);
	console.log("the contract is:");
	console.log(contract);
	if(contract.abi[i].constant === true){
		if(contract.abi[i].inputs.length === 0){
			contract[contract.abi[i].name]({from:aAddr}, function(error, result){
				if(!error){
					console.log("The Result is: ");
					console.log(result);

					
					if(contract.abi[i].outputs[0].type === "address" || "string"){
						document.getElementById("displayInfo").innerHTML = result;
					}
					else{
						document.getElementById("displayInfo").innerHTML = result.c[0];
					}
				}
				else{
					document.getElementById("displayInfo").innerHTML = "";	
					
				}
				
			})
		}
		else{
			var s = []; //inputs
			for(var x = 0; x < input.length; x++){
				s.push(input[x].value);

			}
			console.log(s);
			console.log(contract.abi[i].name);
			contract.tokenBalance(...s, {from:aAddr}, function (error, result){
				if(!error){
					console.log("The Result is: ");
					console.log(result);

					
					if(contract.abi[i].outputs[0].type === "address" || "string"){
						document.getElementById("displayInfo").innerHTML = result;
					}
					else{
						document.getElementById("displayInfo").innerHTML = result.c[0];
					}
				}
				else{
					document.getElementById("displayInfo").innerHTML = "";	
					
				}
			 })
			document.getElementById("displayInfo").innerHTML = "Getting inputs from user is on the processs of being implemented";
			console.log("Getting inputs from user is on the processs of being implemented");
		}
	}
	else{
		console.log("The input is: ");
		console.log(input);
		document.getElementById("displayInfo").innerHTML = "executing the function that require user to pay gas is on the processs of being implemented";
		console.log("executing the function that require user to pay gas is on the processs of being implemented");
	}
}

function sum(a, b){
	return a+b;
}

// ================================================================

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			// Each input value is initialized to null

			acctAddr: "",
			acctBalance: "",
			

			
			contract: "",
			index: 0,
		

			contractAddr: "",
			getAbi: false,
			getEtherscanAbi: false,
			//abi in string form (need it to check if the user enters an abi that can be in JSON form)
			abi: "",
			//abi in Json form
			abiJson: [],

			// drop down input
			selectedOption: "",
			selectedOption2: "",
			selectedOption3: "",


			showAdressTextBox: false,

			showFunctionDropDown: false,

			showInputDropDown: false,
			getInputs: false,
			inputIndex: 0,
			inputs: [],

			
		};
		

		this.handleSubmit = this.handleSubmit.bind(this);
		this.assignIndex = this.assignIndex.bind(this);
		
	}

	handleAddContract = () => {
		this.setState({ showAdressTextBox: !this.state.showAdressTextBox });
		if (this.state.showAdressTextBox === false) console.log("faaaals");
		else console.log("truuu");
	};

	handleGetAbi = () =>{
		this.setState({getEtherscanAbi: false});
		this.setState({getAbi: !this.state.getAbi});
	}

	handleGetEtherscanAbi = () =>{
		this.setState({getAbi: false});
		this.setState({getEtherscanAbi: !this.state.getEtherscanAbi});
	}

	async RetrieveVContractAddr (){
		await this.setState({contractAddr: this.refs.Vcontractaddr.value});
		//this.contractAddr = this.refs.Vcontractaddr.value;
		
		
		$.post('http://api.etherscan.io/api?module=contract&action=getabi&address=' + this.state.contractAddr, function (data) {
			this.setState({abi: data.result});
			this.setState({abiJson: JSON.parse(data.result)})
			console.log("The Abi is retrived from etherscan. Here is the abi:");
			console.log(this.state.abi);
			console.log(this.state.abiJson);
			
		}.bind(this));
		
	}

	async RetrieveContractAddr(){
		await this.setState({contractAddr: this.refs.contractaddr.value});
		
		console.log(this.state.contractAddr);
	}

	async handleRetrieveAbi(){
		await this.setState({abi: this.refs.contractabi.value});
		await this.setState({abiJson: JSON.parse(this.refs.contractabi.value)});
		console.log(this.state.abi);
	}

	async RetrieveInput(){
		
		
		this.state.inputs[this.state.inputIndex].value = this.refs.userInput.value;		
		

	}


	handleSubmit(){
		
		console.log("Submitted");
		this.setState({showFunctionDropDown: !this.state.showFunctionDropDown});
		
	};


	// drop down one
	handleChange1 = selectedOption => {
		this.setState({ selectedOption: selectedOption.value });
		var a = ["Hello", "World"];
		var b = "sum";
		
		console.log(b["concat"].apply(b,a));
		
		
		if(selectedOption.value === "C2"){
			this.handleGetEtherscanAbi();			
		}
		if (selectedOption.value === "C3"){
			this.handleGetAbi();
		}
		console.log(selectedOption.value);
	};

	// drop down two (executes the selected function)
	handleChange2 = selectedOption => {
		this.setState({ selectedOption2: selectedOption.value });
		console.log(selectedOption.label);
		console.log(selectedOption.index);
		(async () => {
			await this.setState({index: selectedOption.index});
			console.log("Index: " + this.state.index);
			console.log("Abi: " + this.state.abi);
			
			if(this.state.abiJson[this.state.index].inputs.length > 0){
					await this.setState({inputs: createJsonForInput(this.state.index, this.state.abi)})
					this.setState({showInputDropDown: true});
					
				
			}else{
				executeFunc(this.state.index, this.state.abiJson, this.state.contractAddr, this.state.acctAddr, this.state.inputs);
			}
		})();			
			
		// console.log(this.state.index);
		// if(this.state.abi[this.state.index].inputs.length > 0){
		// 	this.setState({showInputDropDown: !this.state.showInputDropDown});
		// }
		// executeFunc(this.state.index, JSON.parse(this.state.abi), this.state.contractAddr, this.state.acctAddr);
	};

	executeWithInputs(){
		console.log("The inputs: ");
		console.log(this.state.inputs);
		executeFunc(this.state.index, this.state.abiJson, this.state.contractAddr, this.state.acctAddr, this.state.inputs);
	}
	

	async assignIndex (i){
		await this.setState({index: i});
		console.log("Index: " + this.state.index);
	}

	handleChange3 = selectedOption => {
		this.setState({ selectedOption3: selectedOption.label });
		(async () =>{
			this.setState({inputIndex: selectedOption.index});
			
			console.log("Inside Handle change 3:");
			console.log("Abi: ");
			console.log(this.state.abiJson);
			console.log("index: " + this.state.index);
			this.setState({getInputs: true})
		})();
		
		
		console.log(selectedOption.value);
	};



	async setAcct(){
		await this.setState({acctAddr: this.refs.acctBox.value});
		console.log(this.state.acctAddr);
		await this.setState({acctBalance: getBalance(this.state.acctAddr)});
		console.log(this.state.acctBalance);
	}



	render() {
		const options1 = [
			{ value: "C2", label: "Enter an Etherscan verified contract" },
			{ value: "C3", label: "Enter abi and contract manually"}
		];

	
		const option3 = createJsonForList(this.state.abi);
		let inputOption = [];
		if(!(this.state.index === "")){
		
			inputOption = createJsonForInput(this.state.index, this.state.abi);
		}
		console.log("This is option 3");
		console.log(option3);
		console.log("This is input option");
		console.log(inputOption);
		
		//is not being used but might need it. forgot what it does before
		// const filteredOptions = option3.filter(
		// 	o => o.link === this.state.selectedOption
		// );

		return (
			<div className="container">
				<h1>Smart Contract Editor</h1>
				<form id="form_29559" className="appnitro" method="post" action="">
					<div className="form_description">
						<h3>Welcome to the Future</h3>
					</div>
					<ul className="list">

						<div>
						<h4>For easy Access(Be careful when copying and pasting the address to the textbox)</h4>
						<h5>Nahom - 0xA32dA866506b40235B937A4f94E14708E74F1c83</h5>
						<h5>James - 0x66502fB281a63015c80F25A0D3821c763F1Df700</h5>
						<h2>Enter Account Address</h2>
						<input ref = "acctBox" type = "text" />
						<p></p>
						<button onClick = { (e) => {e.preventDefault(); this.setAcct();}}>Submit</button>
						<h3>Your Balance: {this.state.acctBalance + " pirl"}</h3>
						</div>


						<li id="li_1">
							Select Smart Contract
							<Select
								name="form-field-name"
								value={this.state.selectedOption.value}
								/*onChange={this.updatePirlWallet}*/
								onChange={this.handleChange1}
								options={options1}
							/>
						</li>

						{
							this.state.getEtherscanAbi && (
									
									<div>
										<h1>Enter a verified Etherscan contract address</h1>
										<input ref = "Vcontractaddr" type = "text" />
										<br/>		
										<button id = "Button" onClick = { (e) => {e.preventDefault(); this.RetrieveVContractAddr(); this.handleSubmit()}}
										>Submit</button>
										
										 
									</div>	
						)}




						{
							this.state.getAbi && (
									
									<div>
										<h1>Enter contract address</h1>
										<input ref = "contractaddr" type = "text" />
										<br/>
										<h3>Enter contract ABI</h3>
										<input ref = "contractabi" type = "text" />
										<br/>
										<button onClick = { (e) => {e.preventDefault(); this.handleRetrieveAbi(); this.RetrieveContractAddr(); this.handleSubmit()}}
										>Submit</button>
										
										 
									</div>	
						)}
						{
							this.state.showFunctionDropDown && (
								<li id="li_2">
									Select Function
									<Select
										name="form-field-name"
										value={this.state.selectedOption2.value}
										onChange={this.handleChange2}
										options={option3}
									/>
								</li>
						)}

						{
							this.state.showInputDropDown && (
								<li id="li_3">
								Select an Input option
								<Select
									name="form-field-name"
									value={this.state.selectedOption3.value}
									onChange={this.handleChange3}
									options={inputOption}
								/>
							</li>
						)}

						{
							this.state.getInputs && (
									
									<div>
										{this.state.abiJson[this.state.index].inputs[this.state.inputIndex].name + " (" + this.state.abiJson[this.state.index].inputs[this.state.inputIndex].type + ")"}
										<input ref = "userInput" type = "text" />
										<br/>		
										<button id = "Button" onClick = { (e) => {e.preventDefault(); this.RetrieveInput()}}
										>Submit</button>

										<div>
											<button id = "Button" onClick = { (e) => {e.preventDefault(); this.executeWithInputs()}}
											>Finish Inputing and Execute</button>
										</div>									 
									</div>
										
									
						)}		
						<h3 id = "displayInfo"></h3>
						<li className="buttons">
							<input type="hidden" name="form_id" value="29559" />

							
						</li>
					</ul>
				</form>
			</div>
		);
	}
}