class BankAccount {
    constructor(accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount) {
        this.balance += amount;
        this.transactions.push(`Deposited: $${amount}`);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            alert("Insufficient funds!");
            return;
        }
        this.balance -= amount;
        this.transactions.push(`Withdrew: $${amount}`);
    }

    transfer(amount, toAccount) {
        if (amount > this.balance) {
            alert("Insufficient funds!");
            return;
        }
        this.withdraw(amount);
        toAccount.deposit(amount);
        this.transactions.push(`Transferred: $${amount} to Account ${toAccount.accountNumber}`);
        toAccount.transactions.push(`Received: $${amount} from Account ${this.accountNumber}`);
    }

    addInterest(rate) {
        let interest = (this.balance * rate) / 100;
        this.deposit(interest);
        this.transactions.push(`Interest added: $${interest} at rate ${rate}%`);
    }

    getDetails() {
        return {
            accountNumber: this.accountNumber,
            balance: this.balance,
            transactions: this.transactions
        };
    }
}

let account1 = new BankAccount(1);
let account2 = new BankAccount(2);

function deposit() {
    let amount = parseFloat(document.getElementById("depositAmount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }
    account1.deposit(amount);
    updateUI();
}

function withdraw() {
    let amount = parseFloat(document.getElementById("withdrawAmount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }
    account1.withdraw(amount);
    updateUI();
}

function transfer() {
    let amount = parseFloat(document.getElementById("transferAmount").value);
    let toAccountNumber = parseInt(document.getElementById("transferTo").value);
    if (isNaN(amount) || amount <= 0 || isNaN(toAccountNumber)) {
        alert("Enter valid amount and account number");
        return;
    }
    let toAccount = toAccountNumber === 2 ? account2 : null;
    if (!toAccount) {
        alert("Account not found");
        return;
    }
    account1.transfer(amount, toAccount);
    updateUI();
}

function addInterest() {
    let rate = parseFloat(document.getElementById("interestRate").value);
    if (isNaN(rate) || rate <= 0) {
        alert("Enter a valid interest rate");
        return;
    }
    account1.addInterest(rate);
    updateUI();
}

function getAccountDetails() {
    let details = account1.getDetails();
    document.getElementById("accountDetails").textContent = JSON.stringify(details, null, 2);
}

function updateUI() {
    document.getElementById("balance").textContent = account1.balance.toFixed(2);
}
