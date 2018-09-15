	.text
	.globl	_main
	.p2align	4, 0x90
_main:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%eax
	movl	$17, %eax
	movl	$0, -4(%ebp)
	addl	$4, %esp
	popl	%ebp
	retl

