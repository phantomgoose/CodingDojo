def push_front(arr, val):
    # add the new val to the end
    arr.append(val)
    # go through array backwards, move everything over one
    print arr
    for i in range(len(arr) - 1, 0, -1):
        arr[i], arr[i-1] = arr[i-1], arr[i]
        print arr
    return arr

push_front([1,2,3,4,5], 10)