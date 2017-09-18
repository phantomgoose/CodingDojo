denoms_list = [
    ('Dollar', 100),
    # ('Half-Dollar', 50),
    ('Quarter', 25),
    ('Dime', 10),
    ('Nickel', 5),
    ('Penny', 1),
]

# assuming sorted denominations, greedy
def change_list(cents, denoms):
    coins = {}
    remainder = cents
    for denom, value in denoms:
        if value > remainder:
            continue
        new_remainder = remainder % value
        coins[denom] = (remainder - new_remainder) / value
        remainder = new_remainder
        if remainder == 0:
            break
    return coins

print change_list(387, denoms_list)