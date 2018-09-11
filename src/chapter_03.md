# Chapter 3: Printing text output to the terminal

Now we finally make it to Hello World! We are going to translate this classic C program to assembly:

```c
#include <stdio.h>

int main() {
    printf("Hello world\n");

    return 0;
}
```

Now in assembly:

```s
.text

.globl _main
_main:
  # Set up the stack
  pushl %ebp
  movl %esp, %ebp

  # Padding to guarantee the correct stack alignment when we call printf
  pushl $0

  # Set the argument for printf, pushes the address of the "Hello world\n" string on the stack
  pushl $hello_world

  # In the debugger check `expression -f hex -- $esp & 0xF` is 0 at this point to prove stack alignment
  calll _printf

  # Remove the padding and argument from the stack
  addl $8, %esp

  # Set the exit status
  xorl %eax, %eax

  # Return to calling code
  popl %ebp
  retl

hello_world:
  .asciz "Hello world\n"
```

Save this to a file called `calling_printf.s`, then you can compile it by running:

```
$ gcc -m32 -Wl,-no_pie calling_printf.s -o calling_printf.out
```

Notice this time we have added extra options `-Wl,-no_pie` to the command. These are needed to explicitly tell the linker we are not building a "PIE" - a Position Independent Executable. Depending on the defaults configured in your compiler, without this you might get a warning from the linker. E.g. on Mac OS X 10.7 and later you would see:

```
$ gcc -m32 calling_printf.s -o calling_printf.out
ld: warning: PIE disabled. Absolute addressing (perhaps -mdynamic-no-pic) not allowed in code signed PIE, but used in _main from /var/folders/nv/1bhw903d6n5967dp391qtv4h0000gn/T/calling_printf-e2c93c.o. To fix this warning, don't compile with -mdynamic-no-pic or link with -Wl,-no_pie
```

Building position independent executables is a security feature as it allows an operating system to load an executable at a random address each time it is executed. However it complicates the addressing of our string data so we are switching that off for the sake of pedagogical simplicity.

Finally, we can execute and watch the output to see if it worked:

```
$ ./calling_printf.out
Hello world
```

## Explanation

For the first time we are calling out to a function defined by somebody else. Just as with our example in chapter 2, where whatever code called our `main` function left parameters for us in the stack, we now have to do the same for `printf`. The key lines here are:

```s
pushl $hello_world
calll _printf
```

As usual we are in 32-bit mode, so we are using instruction mnemonics suffixed with `l` for `long`. We `push` the address of our string data onto the stack. Prefixing the `hello_world` label with `$` gets the address of the *location counter* at the point that the label is defined.

---

## Key points

* We need to ensure the stack is aligned before calling a function
* We push parameters we want to pass onto the stack before calling a function
* We use the `call` instruction to jump to and execute a function
* Our code must reset the stack after the function has returned
* Using `xor` with both operands set to the same register, is a trick used to set a register value to 0.
* Labels are used to reference constants values such as our string message. They are also used to mark the beginning of sections of executable code.
