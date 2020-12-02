//Sketch a solution

let program = {
  budgets: [],

  createBudget: function(name) {
    if (!program.budgets.some(b => b.name === name)) {
      let newBudget = new Budget(name);
      program.budgets.push(newBudget);
    } else {
      console.log("Budget with that name already exists.")
    }
  }
}

class Budget {
  constructor(name) {
    this.name = name;
    this.plannedIncome = 0;
    this.plannedExpenses = 0;
    this.actualExpenses = 0;
    this.categories = [
      new Category("savings"),
      new Category("housing"),
      new Category("transportation"),
      new Category("food"),
      new Category("personal"),
      new Category("lifestyle"),
      new Category("health"),
      new Category("insurance"),
      new Category("debt"),
      new Category("giving")
    ]
  }

  get availableToBudget() {
    return this.plannedIncome - this.plannedExpenses;
  }

  get availableToSpend() {
    return this.plannedIncome - this.actualExpenses;
  }

  addIncome(amount) {
    if (typeof amount === "number") {
      this.plannedIncome += amount;
    } else {
      console.log('Argument must be a number')
    }
  }

  planExpense(category, name, amount) {
    let cat = this.categories.find(c => c.name === category);

    cat.subCategories.push(new SubCategory(name, amount));

    this.plannedExpenses += amount;
  }

  logExpense(amount, name, subcategory, category) {
    let expense = new Transaction(name, amount);
    
    this.categories
      .find(c => c.name === category)
      .subCategories.find(s => s.name === subcategory)
      .transactions.push(expense);

    this.categories
      .find(c => c.name === category)
      .subCategories.find(s => s.name === subcategory)
      .spent += amount;  

    this.actualExpenses += amount;
  }
}

class Category {
  constructor(name) {
    this.name = name;
    this.subCategories = [];
  }
}

class SubCategory {
  constructor(name, amount) {
    this.name = name;
    this.planned = amount;
    this.spent = 0;
    this.transactions = [];
  }

  get availableToSpend() {
    return this.planned - this.spent;
  }
}

class Transaction {
  constructor(name, amount) {
    this.date = new Date().getDate();
    this.name = name;
    this.amount = amount;
  }
}

let dec_2021 = new Budget("December 2021");
program.createBudget(dec_2021);

dec_2021.addIncome(1200);
dec_2021.planExpense("housing", "rent", 550);
dec_2021.logExpense(550, "rent", "rent", "housing");

//console.log(dec_2021);

