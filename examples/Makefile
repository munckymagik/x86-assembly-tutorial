CC ?= cc
# CFLAGS += -g
CFLAGS += -O1
CFLAGS += -m32
CFLAGS += -Wall
CFLAGS += -Wextra
CFLAGS += -Werror
# Tell the linker not to use position independent code. Needed to reference string data simply.
# CFLAGS += -Wl,-no_pie


C_SRCS := $(wildcard *.c)
C_ASM  := $(patsubst %.c,%.s,$(C_SRCS))
C_BINS := $(patsubst %.c,%.out,$(C_SRCS))
X86_SRCS := $(wildcard *_x86.s)
X86_BINS := $(patsubst %.s,%.out,$(X86_SRCS))
BINS := $(C_BINS) $(X86_BINS) 


.PHONY: all
all: $(BINS)

.PHONY: cbins
cbins: $(C_BINS)

.PHONY: casm
casm: $(C_ASM)

.PHONY: info
info:
	@echo X86_SRCS: $(X86_SRCS)
	@echo X86_BINS: $(X86_BINS)
	@echo
	@echo C_SRCS: $(C_SRCS)
	@echo C_ASM: $(C_ASM)
	@echo C_BINS: $(C_BINS)
	@echo
	@echo BINS: $(BINS)

.PHONY: clean
clean:
	rm -rf *.out *.dSYM $(C_ASM)

$(BINS): Makefile

%.s: %.c
	$(CC) $(CFLAGS) -S $(<) -o $(@)

%.out: %.s
	$(CC) $(CFLAGS) $(<) -o $(@)
