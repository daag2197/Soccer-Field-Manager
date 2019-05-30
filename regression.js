/*
Base equation = a + bx ->(best adjust line)
a = mean(y) - b*mean(x) -> ordenada al origen (intercept)
*/

function mean(n){
    let values = n;
    let sum = values.reduce((previous, current) => current += previous);
    let avg = sum / values.length;
    return parseFloat(avg)
}

// Compute slope Sum
function slope_sum(x, y){ // 'b' on equation
    b = 0;
    n_total = 0;
    d_total = 0;
    for(i=0; i< x.length; i++){
        yi = parseInt(y[i]);
        xi = parseInt(x[i]);

        n = (xi - mean(x)) * (yi-mean(y));
        d = Math.pow((xi-mean(x)), 2);
        n_total += n;
        d_total += d;
    }
    return n_total/d_total // May have trouble when d_total = 0
}

function intercept(x, y, b){ // ordenada al origen ('a' on equation)
    return mean(y) - b*mean(x)
}

function predict_line(a, b, X){ // y final result (X is a variable to predict on y axe)
    return (a + b*X)
}

function regression(golazos, numero_partido){
    // Datasets are arrays (X & Y)
   /* Ejemplos valores x, y
    x = [4, 0, 1];
    y = [1, 2, 3];
    */
    
   var x = golazos;
   var y = numero_partido; // [1,2,3]


    predictable_value = 4; // Free variable to predict on Y axe

    b = slope_sum(x, y); // Gradient
    a = intercept(x, y, b)

    prediction = predict_line(a,b, predictable_value);

    console.log("Intercept", a);
    console.log("b = ", b);
    console.log ("Predicting When X is", predictable_value, "Y = ", prediction);

    return parseInt(prediction)
}

