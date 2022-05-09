import React from 'react'
import cola from '../images/cola.png'
import umaru1 from '../images/umarusad1.jpeg'
import umaru2 from '../images/umarusad2.jpeg'
import umaru3 from '../images/umarusad3.jpeg'
import umaru4 from '../images/umarusad4.gif'
import Match from './Match'
import config from '../config.js'
import ree from '../config.js'

export default function Main(){

    const [userInput, setUserInput] = React.useState({you:'you', crush: 'your crush'});
    const [resultArray, setResultArray] = React.useState([]);

    function toggle(event){
        const {name, value} = event.target;
        setUserInput(prevState =>{
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    React.useEffect(()=>{
        var token = ree;
    })

    function addToResultArray(newItem){
        if(resultArray.includes(newItem)){
            return;
        }
        console.log(newItem.percentage);
        setResultArray(prevState => {
            return [newItem, ...prevState]
        })
    }

    function determineImage(percentage){
        if(percentage > 90){
            return cola;
        }else if(percentage > 70){
            return umaru1;
        }else if(percentage > 50){
            return umaru2;
        }else if(percentage > 30){
            return umaru3;
        }else{
            return umaru4;
        }
    }

    function loadResults(){
        console.log(`name:${userInput.you} crush:${userInput.crush}`)
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com',
                'X-RapidAPI-Key': `${ree}`
            }
        };
        
        fetch(`https://love-calculator.p.rapidapi.com/getPercentage?sname=${userInput.crush}&fname=${userInput.you}`, options)
            .then(response => response.json())
            .then(response => {
                setResultArray(prevState =>{
                    return ([response, ...prevState])
                })
                console.log(response)})
            .catch(err => console.error(err));
    }

    function clearHistory(){
        setResultArray([]);
    }

    function loadHistory(){
        const matchHistory = resultArray.map(item => {
            return <Match match={`${item.fname} and ${item.sname}`}
            percentage={item.percentage}
            description={item.result}
            imgSrc={determineImage(item.percentage)}/>
        })
        return matchHistory;
    }

    return(
        <main>
            <div className='form'>
                <input onChange={toggle} className='form-input' name="you"placeholder='your name'></input>
                <input onChange={toggle} className='form-input' name="crush"placeholder='Name of crush'></input>
                <button onClick = {loadResults} className='form-button'>Check Compatibility</button>
            </div>
            <div className='results'>
                <h1 className='image-text top'>{resultArray.length > 0 ? `${resultArray[0].fname+ " and " + resultArray[0].sname}: ${resultArray[0].percentage}% compatibility` : "input your and your crush's name to get started"}</h1>
                <h1 className='image-text bottom'>{resultArray.length > 0 ? resultArray[0].result : "let's see if you're winning"}</h1>
                <img className='big-image' src={resultArray.length > 0 ? determineImage(resultArray[0].percentage) : cola}></img>
            </div>
            <div className='history'>
                { resultArray.length > 0 && <button onClick={clearHistory} className='form-button'>Clear History</button>  }   
            </div> 
            <div className='history-list'>
                {loadHistory()}
            </div>
        </main>
    )
}