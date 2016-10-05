$(document).ready(function() {
    var entry_num = 0;
    var entry_cal = '';
    var temp = '';
    var total = 0;
    $('button').on('click', function(){
        //Collect every single input from buttons
        val = $(this).text();

        //Button input which is number or '.'
        if (!isNaN(val) || val === '.') {
            //In case last '=' result stack up with new input
            if (typeof temp === 'number') {
                temp = '';
            }
            //Put all number inputs into a string until button input gives non-number
            temp += val;
            //Print whatever number input on calculator screen
            $("#screen").val(temp.substring(0,10));
        }

        //Button inputs which is 'AC'
        else if (val === 'AC') {
            //Clear everything up
            temp = '';
            entry_num = '';
            entry_cal = '';
            total = 0;
            $("#screen").val(temp);
        }

        //Button inputs which is 'CE'
        else if (val === 'CE') {
            //Delete last digit of input number string
            temp = temp.substring(0, temp.length - 1);
            $("#screen").val(temp.substring(0,10));
        }

        //Button inputs which is '+', '-', 'x', '÷', '%', or '='
        else {
            //Check if equation-right number exists <-- newer number input
            if (temp) {
                //Check if equation-left number exists <--older number input, and equation symbol exist
                if (entry_num && entry_cal) {
                    entry_num = filterDigitsOverTen(entry_num + "");
                    temp = filterDigitsOverTen(temp);
                    console.log(entry_num);
                    console.log(temp);
                    //Calculate a equation with given elements
                    switch (entry_cal) {
                        case '+':
                            total = entry_num + temp;
                            break;
                        case '-':
                            total = entry_num - temp;
                            break;
                        case 'x':
                            total = entry_num * temp;
                            break;
                        case '÷':
                            total = entry_num / temp;
                            break;
                        case '%':
                            total = entry_num % temp;
                            break;
                    }

                    //Limit the total digit of result to 10
                    if ((total + "").length > 10) {
                        total = limitTotalDigitTen(total + ".");
                    }

                    //Print result on calculator screen
                    console.log(total);
                    if (total) {
                        $("#screen").val(total);
                    }
                    else {
                        $("#screen").val("err");
                    }

                    //If current equation symbol is '=', store the current result to equation-right number, then clear up equation-left number and equation symbol, also could keep going with chain calculation
                    if (val === '=') {
                        temp = total;
                        entry_cal = '';
                        entry_num = 0;
                    }
                    //Chain calculation, store the current result of equation-left number, store the latest equation symbol to equation symbol, equation-right number wait for new number input
                    else {
                        entry_num = total;
                        entry_cal = val;
                        temp = '';
                    }
                }

                //If only one equation number exists, store if to equation-left number, store the current equation symbol, and wait for new number input, will store in equation-right number
                else {
                    entry_num = parseFloat(temp);
                    entry_cal = val;
                    temp = '';
                }

            }

            //If equation doesn't build up in the correct way, print 'err' on calculator screen
            else {
                $("#screen").val("err");
                temp = '';
                entry_num = '';
                entry_cal = '';
                total = 0;
            }
        }
    });

    function filterDigitsOverTen(str) {
        if (str.length <= 10) {
            return parseFloat(str);
        }
        else {
            if (str[9] === '.') {
                return parseFloat(str.slice(0, 9));
            }
            return parseFloat(str.slice(0, 10));
        }
    }

    function limitTotalDigitTen(str) {
        if (str.length <= 10) {
            return parseFloat(str);
        }
        else {
            if (str.slice(0, 10).indexOf('.') !== -1) {
                console.log("enter");
                console.log(str.slice(0, 10).indexOf('.'))
                if (str[9] === '.') {
                    return str.slice(0, 8);
                }
                return parseFloat(str.slice(0, 10));
            }
            console.log("should be err");
            return null;
        }
    }
});
