document.addEventListener("DOMContentLoaded", function () {
  // Transaction form
  const transactionForm = document.getElementById("transaction-form");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("type");
  const categoryInput = document.getElementById("category");

  // Transaction table
  const transactionTable = document.getElementById("transaction-table");
  const transactionList = document.getElementById("transaction-list");

  // Balance
  const balanceAmount = document.getElementById("balance-amount");

  // Transaction data
  let transactions = [];

  // Add transaction
  transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const type = typeInput.value;
    const category = categoryInput.value.trim();

    if (description === "" || isNaN(amount) || category === "") {
      return;
    }

    const transaction = {
      id: new Date().getTime(),
      description: description,
      amount: amount,
      type: type,
      category: category
    };

    transactions.push(transaction);

    renderTransactionList();
    updateBalance();
    resetForm();
  });

  // Delete transaction
  function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    renderTransactionList();
    updateBalance();
  }

  // Render transaction list
  function renderTransactionList() {
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
      const row = document.createElement("tr");

      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = transaction.description;

      const amountCell = document.createElement("td");
      amountCell.textContent = transaction.amount.toFixed(2);

      const typeCell = document.createElement("td");
      typeCell.textContent = transaction.type;

      const categoryCell = document.createElement("td");
      categoryCell.textContent = transaction.category;

      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn");
      deleteButton.addEventListener("click", function () {
        deleteTransaction(transaction.id);
      });

      deleteCell.appendChild(deleteButton);

      row.appendChild(descriptionCell);
      row.appendChild(amountCell);
      row.appendChild(typeCell);
      row.appendChild(categoryCell);
      row.appendChild(deleteCell);

      transactionList.appendChild(row);
    });
  }

  // Update balance
  function updateBalance() {
    const income = transactions
      .filter(transaction => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
      .filter(transaction => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = income - expenses;

    balanceAmount.textContent = balance.toFixed(2);
  }

  // Reset form
  function resetForm() {
    transactionForm.reset();
  }

  // Initial render
  renderTransactionList();
  updateBalance();
});
