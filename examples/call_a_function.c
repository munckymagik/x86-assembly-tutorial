#include <limits.h>

long __attribute__ ((noinline)) add_13(long input0, long input1, long input2, long input3, long input4, long input5) {
    return input0 + input1 + input2 + input3 + input4 + input5 + 13;
}

int main() {
    long result = add_13(1, 2, 3, 5, 8, 11);

    return (int) result;
}
