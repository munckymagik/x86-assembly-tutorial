# Chapter 3: Printing text output to the terminal

Now we finally make it to Hello World! We are going to translate this classic C program to assembly:

```c
{{#include ../examples/calling_printf.c}}
```

Now in assembly:

```x86att
{{#include ../examples/calling_printf.s}}
```

---

## Key points

* We need to ensure the stack is aligned before calling a function
* We push parameters we want to pass onto the stack before calling a function
* We use the `call` instruction to jump to and execute a function
* Our code must reset the stack after the function has returned
* Using `xor` with both operands set to the same register, is a trick used to set a register value to 0.
* Labels are used to reference constants values such as our string message. They are also used to mark the beginning of sections of executable code.
