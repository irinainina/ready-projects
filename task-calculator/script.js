class Calculator {

    constructor(previousValue, currentValue, operator) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.operator = operator;
    }

    clear() {
        this.previousValue = '';
        this.currentValue = '';
        this.operator = '';
        result.innerHTML = ''
        buffer.innerHTML = ''
    };

    getDigitNumberAfterDecimal(str) {
        let arr = str.split('');
        console.log(arr)
        let i = arr.length - 1;
        let count = 0
        while (i > -1) {
            if (arr[i] === '.') {
                return count
            }
            count++;
            i--;
        }
        return 0;
    };

    addOperand(operator) {
        let countDecimal = 0;
        if (this.operator === '=') {
            this.operator = '';
        }
        if (this.operator === '') {
            this.operator = operator;
        }
        if (this.currentValue === '') {
            return false;
        }
        if (this.previousValue === '' && this.operator !== 'r') {
            this.previousValue = this.currentValue + ' ' + this.operator;
            this.operator = operator;
            buffer.innerHTML = this.previousValue;
            this.currentValue = '';
            result.innerHTML = '';
        } else if (this.currentValue !== '') {
            let buff = this.previousValue.split('').slice(0, this.previousValue.length - 2).join('');

            let countCurrentValue = calculator.getDigitNumberAfterDecimal(this.currentValue);
            let countPreviousValue = calculator.getDigitNumberAfterDecimal(this.previousValue.split('').slice(0, this.previousValue.length - 2).join(''));
            console.log(countPreviousValue)
            console.log(countCurrentValue)
            if (countCurrentValue !== 0 && countPreviousValue !== 0) {
                countDecimal = Math.max(countCurrentValue, countPreviousValue);
            }
            switch (this.operator) {
                case '+':
                    this.previousValue = (parseFloat(buff) + parseFloat(this.currentValue)).toFixed(countDecimal) + ' ' + operator;
                    break;
                case '-':
                    this.previousValue = (parseFloat(buff) - parseFloat(this.currentValue)).toFixed(countDecimal) + ' ' + operator;
                    break;
                case '*':
                    this.previousValue = (parseFloat(buff) * parseFloat(this.currentValue)).toFixed(countDecimal) + ' ' + operator;
                    break;
                case '/':
                    this.previousValue = (parseFloat(buff) / parseFloat(this.currentValue)).toFixed(2) + ' ' + operator;
                    break;
                case 'e':
                    this.previousValue = (Math.pow(parseFloat(buff), parseFloat(this.currentValue))).toFixed(countDecimal) + ' ' + operator;
                    break;
                case 'r':
                    this.previousValue = Math.pow(parseFloat(this.currentValue), 1 / 2);
                    break;
                default:
                    alert("Нет таких значений");
            }
            this.operator = operator;
            result.innerHTML = '';
            this.currentValue = '';
            if (operator === '=') {
                this.currentValue = this.previousValue.split('').slice(0, this.previousValue.length - 1).join('');
                this.previousValue = '';
                // this.operator = '';
                result.innerHTML = this.currentValue;
                // this.currentValue = '';
            }
            buffer.innerHTML = this.previousValue;
            if (operator === 'r') {
                this.previousValue = '';
                this.currentValue = '';
                this.operator = '';
            }
        }
    }

    delete() {
        this.currentValue = this.currentValue.split('').slice(0, this.currentValue.length - 1).join('');
        result.innerHTML = this.currentValue;
    };

    isOperator() {
        return this.currentValue !== '' && (this.previousValue !== '' || this.previousValue.split('')[this.previousValue.length] !== 0);
    };

    isExistDot(data) {
        return data === '.' && this.currentValue.indexOf('.') + 1;
    };

    appendNumber(data) {
        if (this.operator === '=') {
            return false;
        }
        if (data === '0' && this.currentValue.indexOf('0') === 0) {
            console.log('Есть уже ноль');
            return false;
        }
        if (data === '-' && this.currentValue.indexOf('-') >= 0) {
            console.log('Есть уже минус');
            return false;
        }
        // console.log(this.currentValue);
        if (this.currentValue !== '') {
            this.currentValue = this.currentValue + data;
        } else {
            this.currentValue = data;
        }
        result.innerHTML = this.currentValue;
    };
}

// let calculator = new Calculator();
let numberButton = document.querySelectorAll('[data-number]');
let operationButton = document.querySelectorAll('[data-operation]');
// let clear = document.querySelectorAll('[data-clear]');
const minus = document.querySelector('[data-minus]');
const clear = document.querySelector('[data-clear]');
const del = document.querySelector('[data-del]');
const result = document.querySelector('.current-operand');
const buffer = document.querySelector('.previous-operand');
// const but = document.querySelector('.but');

let calculator = new Calculator('', '', '');

minus.addEventListener('click', () => {
        console.log(calculator.isOperator(minus.dataset.minus))
        if(calculator.isOperator(minus.dataset.minus)) {
            calculator.addOperand(minus.dataset.minus);
        } else {
            calculator.appendNumber(minus.dataset.minus);
        }
    }
);

clear.addEventListener('click', () => {
        calculator.clear();
    }
);
del.addEventListener('click', () => {
        calculator.delete();
    }
);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
            if (!calculator.isExistDot(button.dataset.number)) {
                calculator.appendNumber(button.dataset.number);
            }

        }
    );
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
            // console.log(button.dataset.operation);
            calculator.addOperand(button.dataset.operation);
        }
    );
})
