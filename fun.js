// Transaction class
class Transaction {
    constructor(description, amount, type) {
      this.description = description;
      this.amount = parseFloat(amount);
      this.type = type;
    }
  }
  
  // UI class
  class UI {
    static displayTransactions() {
      const transactions = Store.getTransactions();
      transactions.forEach((transaction) => UI.addTransactionToList(transaction));
    }
  
    static addTransactionToList(transaction) {
      const table = document.getElementById('transaction-list');
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${transaction.description}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.type}</td>
        <td><button class="delete-btn">Delete</button></td>
      `;
  
      table.appendChild(row);
    }
  
    static deleteTransaction(element) {
      if (element.classList.contains('delete-btn')) {
        element.parentElement.parentElement.remove();
      }
    }
  
    static clearFields() {
      document.getElementById('description').value = '';
      document.getElementById('amount').value = '';
      document.getElementById('type').value = 'income';
    }
  
    static updateBalance() {
      const transactions = Store.getTransactions();
      let balance = 0;
  
      transactions.forEach((transaction) => {
        if (transaction.type === 'income') {
          balance += transaction.amount;
        } else if (transaction.type === 'expense') {
          balance -= transaction.amount;
        }
      });
  
      const balanceAmount = document.getElementById('balance-amount');
      balanceAmount.textContent = `$${balance.toFixed(2)}`;
    }
  }
  
  // Store class (for simplicity, using local storage as the data store)
  class Store {
    static getTransactions() {
      let transactions = localStorage.getItem('transactions');
      return transactions ? JSON.parse(transactions) : [];
    }
  
    static addTransaction(transaction) {
      const transactions = Store.getTransactions();
      transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  
    static removeTransaction(index) {
      const transactions = Store.getTransactions();
      transactions.splice(index, 1);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }
  
  // Event: Display transactions
  document.addEventListener('DOMContentLoaded', UI.displayTransactions);
  
  // Event: Add transaction
  document.getElementById('add-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
  
    if (description && amount) {
      const transaction = new Transaction(description, amount, type);
      UI.addTransactionToList(transaction);
      Store.addTransaction(transaction);
      UI.updateBalance();
      UI.clearFields();
    }
  });
  
  // Event: Delete transaction
  document.getElementById('transaction-list').addEventListener('click', (e) => {
    UI.deleteTransaction(e.target);
    const index = Array.from(e.target.parentElement.parentElement.parentElement.children).indexOf(e.target.parentElement.parentElement);
    Store.removeTransaction(index);
    UI.updateBalance();
  });
  