# Basic x86 Assembly Lanugage Tutorial on Mac OS X

* Will use Gnu AS (GAS) and AT&T syntax

## A main method with no body


```s
# main_method_return_0.s
	.text
	.globl	_main
_main:
	movl	$13, %eax
	retl
```

Save this to a file called `main_method_return_0.s`, then you can compile it by running:

```
$ gcc -m32 main_method_return_0.s -o main_method_return_0.out
```

Then execute and examine the exit status of the process:

```
$ ./main_method_return_0.out; echo "Exit status was: $?"
```


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
	xorl	%eax, %eax
```

Next `%eax` is XOR'd with itself, placing the result back back in `%eax`. Effectively `ax = ax XOR ax`. The side-effect of this is to set all bits in AX to 0. Presumably this is a more "efficient" trick to zero a register than to `movl $0, $eax` which uses immediate addressing to `$0`?

```s
	retl
```

Finally, `ret` loads the value currently on the stack into the `%eip` instruction-pointer. Effectively making the CPU continue executing where we left off before `_main` was called.

If we don't want to return zero we can achieve this by loading number into EAX explicitly.

```s
_main:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%eax
	movl	$17, %eax    # <--- this was xorl	%eax, %eax in the previous example
	movl	$0, -4(%ebp)
	addl	$4, %esp
	popl	%ebp
	retl
```

## Calling a function
