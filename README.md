# Basic x86 Assembly Lanugage Tutorial on Mac OS X

* Will use Gnu AS (GAS) and AT&T syntax

## The smallest program we can write

Here is the smallest program we can write. It declares a `main` method that does nothing except immediately return setting a `0` exit status.

```s
	.text
	.globl	_main
_main:
	movl	$0, %eax
	retl
```

Save this to a file called `main_method_return_0.s`, then you can compile it by running:

```
$ gcc -m32 main_method_return_0.s -o main_method_return_0.out
```

Then execute and examine the exit status of the process to see if it worked:

```
$ ./main_method_return_0.out; echo "Exit status was: $?"
```

TODO explain the generic portions, flesh this out more.

Meaning:

```s
	.text
```

A directive that declares the start of a section of code.

```s
	.globl	_main
```

Makes the `_main` symbol (label) visible to the linkder `ld`.

```s
_main:
```

Declares the label `_main`. This is the symbol that was previously made visible to the linker using `.globl`.


```s
	movl	$0, %eax
```

This loads the literal number `0` into the accumulator register called AX.

We are working 32-bit mode so the `mov` instruction is suffixed with an `l` which makes it the 32-bit version of the `mov` instruction.

Similarly, because we using a 32-bit instruction we also need to access AX register as a 32-bit value. We do this by prepending the register name with an `e`, thus `eax`.

```s
	retl
```

Finally, `ret` returns control to the lower-level code which called our `main` function. Effectively making the CPU continue executing where we left off before `main` function was called.

If we want to return a different number we can just change the value loaded into AX.

```s
	.text
	.globl	_main
_main:
	movl	$17, %eax    # <--- we now return the exit code 17
	retl
```

## Calling a function
