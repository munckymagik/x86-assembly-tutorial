#include "xutils.h"

.text

.globl CSYM(main)
CSYM(main):
  # Set up the stack
  pushl %ebp
  movl %esp, %ebp

  # Call add
  pushl $2
  pushl $3
  calll _add
  addl	$8, %esp

  # Return to calling code
  popl %ebp
  retl

_add:
  # Setup the stack
  pushl %ebp
  movl %esp, %ebp

  # Perform the calculation with the two arguments
  movl 8(%ebp), %eax
  addl 12(%ebp), %eax

  # Return to calling code
  popl %ebp
  retl
