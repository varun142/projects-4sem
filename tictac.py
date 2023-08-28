def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 9)

def check_winner(board, player):
    # Checking rows, columns, and diagonals for a win
    for i in range(3):
        if all(board[i][j] == player for j in range(3)) or \
           all(board[j][i] == player for j in range(3)):
            return True
    if all(board[i][i] == player for i in range(3)) or \
       all(board[i][2 - i] == player for i in range(3)):
        return True
    return False

def is_board_full(board):
    return all(cell != " " for row in board for cell in row)

def main():
    board = [[" " for _ in range(3)] for _ in range(3)]
    players = ["X", "O"]
    current_player = 0

    print("Welcome to Tic-Tac-Toe!")
    print_board(board)

    while True:
        row = int(input("Player {} - Enter row (0, 1, 2): ".format(players[current_player])))
        col = int(input("Player {} - Enter column (0, 1, 2): ".format(players[current_player])))

        if 0 <= row < 3 and 0 <= col < 3 and board[row][col] == " ":
            board[row][col] = players[current_player]
            print_board(board)

            if check_winner(board, players[current_player]):
                print("Player {} wins!".format(players[current_player]))
                break
            elif is_board_full(board):
                print("It's a draw!")
                break

            current_player = 1 - current_player
        else:
            print("Invalid move. Try again.")

if __name__ == "__main__":
    main()
