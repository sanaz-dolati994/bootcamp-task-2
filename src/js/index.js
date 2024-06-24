const transactions = [
  {
    id: 1,
    type: "افزایش اعتبار",
    price: 1000000,
    refId: 123270311,
    date: 1713977315961,
  },
  {
    id: 2,
    type: "افزایش اعتبار",
    price: 500000,
    refId: 123270405,
    date: 1672532200000,
  },
  {
    id: 3,
    type: "برداشت از حساب",
    price: 200000,
    refId: 1458985369,
    date: 1682886100000,
  },
  {
    id: 4,
    type: "افزایش اعتبار",
    price: 450000,
    refId: 987654321,
    date: 1711937000000,
  },
  {
    id: 5,
    type: "برداشت از حساب",
    price: 770000,
    refId: 741852963,
    date: 1711917089876,
  },
  {
    id: 6,
    type: "افزایش اعتبار",
    price: 590000,
    refId: 987654321,
    date: 1640997292340,
  },
];
let currentSortOrder = "asc";

// تابعی برای ایجاد و پر کردن جدول تراکنش‌ها
function createTransactionTable(transactions) {
  const tableDiv = document.getElementById("transactionTable");
  const table = document.createElement("table");
  table.classList.add("transaction-table");

  // ساخت سر تیتر جدول
  const headerRow = table.insertRow();
  const headers = [
    "ردیف",
    "نوع تراکنش ها ",
    "مبلغ",
    "شماره پیگیری",
    "تاریخ تراکنش",
  ];
  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    if (headerText === "مبلغ") {
      const sortButton = document.createElement("button");
      sortButton.textContent = "🔽";
      sortButton.addEventListener("click", () => {
        currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
        sortAndCreateTransactionTable("price", currentSortOrder);
      });
      headerCell.appendChild(sortButton);
    }
    headerRow.appendChild(headerCell);
  });

  // پر کردن جدول با اطلاعات تراکنش‌ها
  transactions.forEach((transaction) => {
    const row = table.insertRow();
    Object.values(transaction).forEach((value) => {
      const cell = row.insertCell();
      if (typeof value === "number" && value.toString().length > 10) {
        const date = new Date(value);
        cell.textContent = date.toLocaleDateString("fa-IR");
      } else {
        cell.textContent = value;
      }
    });
  });

  // اضافه کردن جدول به دیو مربوطه
  tableDiv.innerHTML = "";
  tableDiv.appendChild(table);
}

// تابع برای مرتب سازی و ساخت جدول
function sortAndCreateTransactionTable(field, order) {
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (order === "asc") {
      return a[field] - b[field];
    } else {
      return b[field] - a[field];
    }
  });
  createTransactionTable(sortedTransactions);
}

// اضافه کردن رویداد کلیک به دکمه بارگذاری تراکنش ها
const loadTransactionsBtn = document.getElementById("loadTransactionsBtn");
loadTransactionsBtn.addEventListener("click", function () {
  createTransactionTable(transactions);
});

// اضافه کردن رویداد keypress به اینپوت جستجو
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
      fetch(`http://localhost:3000/transactions?refId_like=${searchValue}`)
        .then((response) => response.json())
        .then((data) => createTransactionTable(data))
        .catch((error) => console.error("Error fetching transactions:", error));
    }
  }
});
