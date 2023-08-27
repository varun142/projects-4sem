class ExpenseTracker:
    def __init__(self):
        self.expenses = []
        self.income = []

    def add_expense(self, expense_name, amount):
        expense = {'name': expense_name, 'amount': amount}
        self.expenses.append(expense)

    def add_income(self, income_name, amount):
        income = {'name': income_name, 'amount': amount}
        self.income.append(income)

    def calculate_total(self):
        total_expense = sum(expense['amount'] for expense in self.expenses)
        total_income = sum(income['amount'] for income in self.income)
        return total_income - total_expense

    def display_expenses(self):
        for expense in self.expenses:
            print(f"{expense['name']}: -Rs{expense['amount']}")
        for income in self.income:
            print(f"{income['name']}: +Rs{income['amount']}")

    def split_expenses(self, num_friends, percentages):
        total_expense = sum(expense['amount'] for expense in self.expenses)
        total_share = 0

        if len(percentages) != num_friends:
            print("Invalid number of friends or percentages!")
            return

        for percentage in percentages:
            total_share += percentage

        if total_share != 100:
            print("Invalid percentages! Please ensure the sum of percentages is equal to 100.")
            return

        for i, percentage in enumerate(percentages):
            share = (percentage / 100) * total_expense
            print(f"Friend {i + 1} should pay: Rs{share:.2f}")


# Creating an instance of ExpenseTracker
tracker = ExpenseTracker()

# User input loop to add expenses and income dynamically
while True:
    option = input("Enter 'e' to add an expense, 'i' to add income, 's' to split expenses, or 'q' to quit: ")
    if option == 'q':
        break
    elif option == 'e':
        expense_name = input("Enter expense name: ")
        amount = float(input("Enter expense amount: "))
        tracker.add_expense(expense_name, amount)
    elif option == 'i':
        income_name = input("Enter income name: ")
        amount = float(input("Enter income amount: "))
        tracker.add_income(income_name, amount)
    elif option == 's':
        num_friends = int(input("Enter the number of friends: "))
        percentages = [float(input(f"Enter percentage for friend {i + 1}: ")) for i in range(num_friends)]
        tracker.split_expenses(num_friends, percentages)

# Displaying expenses
tracker.display_expenses()

# Calculating and displaying total expense and remaining balance
total_expense = sum(expense['amount'] for expense in tracker.expenses)
remaining_balance = tracker.calculate_total()

print(f"Total Expense: Rs{total_expense}")
print(f"Remaining Balance: Rs{remaining_balance}")
