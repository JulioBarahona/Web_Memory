/*
  Julio Barahona M
  141206
  Sistemas y tecnologias web
  Seccion 10
  Lab6: Memoria
*/

//modules are called and libraries called
import React from 'react'
import ReactDom from 'react-dom'
import './memory.css'

//selects the files from the src folder
import sakura from './sakura.png'
import tomoyo from './tomoyo.png'
import li from './li.png'
import touya from './touya.png'
import yukito from './yukito.png'
import kero from './kero.png'

class Memoria extends React.Component{
	constructor(props){
		super(props); 
		this.state = {
			//sets states of card selection, cards turned and if they are equal
			selected: false, 
			card_selected: null, 
			deck: [],
			stance: Array(12).fill('card'),
			spaces: 6, 
			images: Array(12).fill(null), 
			pairs: 0, 
			turns: 0, 
			rep: Array(6).fill(1)
		}

		this.create_memory(); 
	}

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
				var ctr = arra1.length, temp, index;

				// While there are elements in the array
				while (ctr > 0) {
				// Pick a random index
				index = Math.floor(Math.random() * ctr);
				// Decrease ctr by 1
				ctr--;
				// And swap the last element with it
				temp = arra1[ctr];
				arra1[ctr] = arra1[index];
				arra1[index] = temp;
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
	render(){
		const images = [sakura, tomoyo, li, tomoyo, yukito, kero]; 
		const id = 0;
		return(
			<div className = "table">
				<div className = "leather">
					{
					this.state.deck.map((cont, index)=>{
						return ( 
							<div className="container" key={index}>
								<div className = {this.state.stance[index]}>
									<div
										key={index}
										className="face"
										onClick = {this.handleClick.bind(this, index)}>
									</div>
									<div
										key={index + 12}
										className="back"
										style = {{backgroundImage: 'url(' +this.state.images[index]+ ')'}}
										>
									</div>
								</div>
							</div>

						)

					})
				}
			</div>
		</div>

			)
	}
}


ReactDom.render(
	<Memoria />,
	document.getElementById('root')
)