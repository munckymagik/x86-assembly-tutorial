CC := gcc
CFLAGS  = -std=c99
# CFLAGS += -g
# CFLAGS += -O1
CFLAGS += -m32
CFLAGS += -Wall
CFLAGS += -Wextra
CFLAGS += -pedantic
CFLAGS += -Werror

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
	rm -f *.out

$(BINS): Makefile

%.s: %.c
	$(CC) $(CFLAGS) -S $(<) -o $(@)

%.out: %.s
	$(CC) $(CFLAGS) $(<) -o $(@)
