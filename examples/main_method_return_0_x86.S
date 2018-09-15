	.text
	.globl	_main
_main:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%eax
	xorl	%eax, %eax
	movl	$0, -4(%ebp)
	addl	$4, %esp
	popl	%ebp
	retl

