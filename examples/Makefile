CC := gcc
CFLAGS  = -std=c99
# CFLAGS += -g
# CFLAGS += -O1
CFLAGS += -m32
CFLAGS += -Wall
CFLAGS += -Wextra
CFLAGS += -pedantic
CFLAGS += -Werror
# Tell the linker not to use position independent code. Needed to reference string data simply.
CFLAGS += -Wl,-no_pie

SRCS := $(wildcard *.s)
BINS := $(patsubst %.s,%.out,$(SRCS))

.PHONY: all
all: $(BINS)

.PHONY: info
info:
	@echo $(SRCS)
	@echo $(BINS)

.PHONY: clean
clean:
	rm -rf *.out *.dSYM

$(BINS): Makefile

%.s: %.c
	$(CC) $(CFLAGS) -S $(<) -o $(@)

%.out: %.s
	$(CC) $(CFLAGS) $(<) -o $(@)
