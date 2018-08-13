.text
.globl	_main
_main:
  # Setup the stack
  pushl %ebp
  movl %esp, %ebp

  # Place the two arguments to pass to add on the stack
  pushl $2
  pushl $3

  # Call the add function
  calll _add

  # Clean up the stack after function call
  addl	$8, %esp

  # Restore the previous stack pointer address
  popl %ebp

  # Return to calling code
  retl

_add:
  # Setup the stack
  pushl %ebp
  movl %esp, %ebp

  # Load the first argument into EAX
  movl 8(%ebp), %eax

  # Add the second argument to the value already loaded in EAX
  addl 12(%ebp), %eax

  # $estore the previous stack pointer address
  popl %ebp

  # Return to calling code
  retl
