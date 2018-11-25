import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'
//selects the files from the src folder
import sakura from './sakura.png' 
import tomoyo from './tomoyo.png'
import li from './li.png'
import touya from './touya.png'
import yukito from './yukito.png'
import kero from './kero.png'


class Memoria extends React.Component{

	create_memory(){
		const cards = [sakura, tomoyo, li, touya, yukito, sakura]; 
		const remaining = [...Array(this.state.spaces * 2).keys()]; 

		//shuffles the cards
		for (let i = 0; i< this.state.spaces; i++){
			const first_index = i * 2; 
			const second_index = i * 2 + 1; 

			const card1 = Math.floor(Math.random()*remaining.length);
			const firstNumber = Math.floor(remaining[card1]/2);
			this.state.deck.push(firstNumber);
			this.state.images[first_index] = cards[firstNumber]; 
			remaining.splice(card1, 1);

			//cehckign for shuffling cards so i can  say im not doing poopy work
			console.log('reamaining cards: '+ remaining)
			function shuffle(arra1) {
				var counter = arra1.length, temp, position;

				// While there are elements in the array
				while (counter > 0) {
				// Pick a random position
				position = Math.floor(Math.random() * counter);
				// Decrease counter by 1
				counter--;
				// And swap the last element with it
				temp = arra1[counter];
				arra1[counter] = arra1[position];
				arra1[position] = temp;
				}
				return arra1;
			}

			//selects a nomber max the lenght size and deletes the extre unnecesarry decimal
			const card2 = Math.floor(Math.random()*remaining.length);
			const secondNumber = Math.floor(remaining[card2]/2); 

			//gets the number seleted and makes it so the card matches the position on the suffled arrat
			this.state.deck.push(secondNumber);
			this.state.images[second_index] = cards[secondNumber]; 
			remaining.splice(card2, 1);

				var myArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				console.log(shuffle(remaining));

		}
	}

		constructor(props){
		super(props); 
		this.state = {
			//sets states of card selection, cards turned and if they are equal
			selected: false, 
			//no card selected
			card_selected: null,
			//cards that will be in the gme 
			deck: [],
			//what will be filled in the board
			stance: Array(12).fill('card'),
			//how many different pairs there will be
			spaces: 6, 
			//what the card will look like
			images: Array(12).fill(null), 
			//how many correct pairs have been matched
			pairs: 0, 
			//how many valid clicks have happend
			turns: 0, 
			//the number of cards that will be represented
			rep: Array(6).fill(1)
		}

		this.create_memory(); 
	}

	handleClick(e){
		if (this.state.stance[e] == 'card flipped' ||
			this.state.card_selected === e){
			return;
		}

		this.setState({
			turns: this.state.turns + 1
		})
		this.state.stance[e] = 'card flipped'

		if(this.state.card_selected != null){
			
			setTimeout(()=> {
				if(this.state.deck[this.state.card_selected]=== this.state.deck[e]){
					this.setState({
						pairs: this.state.pairs + 1
					}) 
					if(this.state.pairs === 2){
						
						window.addEventListener("beforeunload", (ev) => {  
							ev.preventDefault();
							return ev.returnValue = 'Yu won! Do you want to keep playing?';
						});
					}
				}
				else{
					this.state.stance[e] = 'card'; 
					this.state.stance[this.state.card_selected] = 'card'; 
				}

				this.setState({
					card_selected: null, 
					selected: false
				})
		}, 750)	
		}
		else{
			this.state.stance[e] = 'card flipped'
			this.setState({
				selected: true, 
				card_selected: e
			})
		}
	}

	//after all the fuzz this bad boys renders out
	render(){
		// gets the entities 
		const images = [sakura, tomoyo, li, tomoyo, yukito, kero];
		//
		const id = 0;
		return(
			<div className = "table">
				<div className = "screenSize">
					{
					this.state.deck.map((cont, position)=>{
						return ( 
							<div className="placeHolder" key={position}>
								<div className = {this.state.stance[position]}>
									<div
										key={position}
										className="cardBCK"
										onClick = {this.handleClick.bind(this, position)}>
									</div>
									<div
										key={position + 12}
										className="cardPRTRT"
										style = {{backgroundImage: 'url(' +this.state.images[position]+ ')'}}
										>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
			)}}

ReactDOM.render(<Memoria />, document.getElementById('app'));
module.hot.accept();