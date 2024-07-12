const express=require('express');
const axios=require('axios');
const app=express();
const PORT=process.env.PORT || 5000;
const WINDOW_SIZE=10;
var num=[];
const fetch_num = async (type) => {
    var url;
    switch (type) {
        case 'p':
            url = 'http://20.244.56.144/numbers/primes';
            break;
        case 'f':
            url = 'http://20.244.56.144/numbers/fibo';
            break;
        case 'e':
            url = 'http://20.244.56.144/numbers/even';
            break;
        case 'r':
            url = 'http://20.244.56.144/numbers/rand';
            break;
        default:
            url = '';
            break;
    }
    try {
        const resp = await axios.get(url);
        const resp_Data = resp.data.num;
        console.log(`Received data for type '${type}':`, resp_Data);
        if (!Array.isArray(resp_Data)) {
            console.error(`Response data for type '${type}' is not an array:`, resp_Data);
            return [];
        }
        return resp_Data;
    } catch (error) {
        console.error(`Error fetching data for type '${type}':`, error);
      
        return [];
    }
};


app.get('/calci/:id', async (req, res) => {
    const { id } = req.params;
    if (!['p', 'f', 'e', 'r'].includes(id)) {
        return res.status(400).json({ error: 'Invalid numberid' });
    }

    const newn= await fetch_num(id);
    newn.forEach((num) => updateNumbers(num));

    const avg = calculateAverage();
    const response = {
        windowPrevState,
        windowCurrState,
        num,
        avg,
    };
    res.json(response);
});
app.listen(PORT,()=>{
    console.log(`Server running in ${PORT}`);
})