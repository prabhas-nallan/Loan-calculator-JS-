//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    e.preventDefault();
    //Hide Results
    document.getElementById('results').style.display='none'
    
    //Show loader
    document.getElementById('loading').style.display='block'
    setTimeout(calculateResults,2000)
})

//Calculate Results
function calculateResults(e){
    // e.preventDefault()
    console.log('calculating.......');
    const amount=document.getElementById('amount')
    const interest=document.getElementById('interest')
    const years=document.getElementById('years')
    const monthlyPayment=document.getElementById('monthly-payment')
    const totalPayment=document.getElementById('total-payment')
    const totalInterest=document.getElementById('total-interest')
    
    const principal=parseFloat(amount.value)
    const calculatedInterest=parseFloat(interest.value)/100/12
    const calculatedPayments=parseFloat(years.value)*12
    
    //compute monthly payments
    const x=Math.pow(1+calculatedInterest,calculatedPayments)
    const monthly=(principal*x*calculatedInterest)/(x-1)
    
    if(isFinite(monthly)){
        monthlyPayment.value=monthly.toFixed(2)
        totalPayment.value=(monthly*calculatedPayments).toFixed(2)
        totalInterest.value=((monthly*calculatedPayments)-principal).toFixed(2)
        //Show results
        document.getElementById('results').style.display='block'
        //Hide loader
        document.getElementById('loading').style.display='none'
        // console.log(monthlyPayment.value);
        // console.log(totalPayment.value);
        // console.log(totalInterest.value);
    }else{
        console.log("plz check ur numbers");
        showError('Please check your numbers')
    }
    // e.preventDefault()
}

//Show Error
function showError(error){
     //Show results
     document.getElementById('results').style.display='block'
     //Hide loader
     document.getElementById('loading').style.display='none' 
    //create div
    const errorDiv=document.createElement('div')
    //Get elements
    const card=document.querySelector('.card')
    const heading =document.querySelector('.heading')
    //Add class
    errorDiv.className='alert alert-danger'
    //Create text node and append to a div
    errorDiv.appendChild(document.createTextNode(error))
    //Insert error before heading
    card.insertBefore(errorDiv,heading)
    //clear error after 3 secs
    setTimeout(clearError,3000)
}
function clearError(){
    document.querySelector('.alert').remove()
}