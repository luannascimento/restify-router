
ROOT_SLASH	:= $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
ROOT	:= $(patsubst %/,%,$(ROOT_SLASH))
NODE_MODULES	:= $(ROOT)/node_modules
NODE_BIN	:= $(NODE_MODULES)/.bin
ESLINT	:= $(NODE_BIN)/eslint
JEST	:= $(NODE_BIN)/jest
COVERAGE	:= $(ROOT)/coverage

ALL_FILES	:= $(shell find $(ROOT) \
	-not \( -path $(NODE_MODULES) -prune \) \
	-not \( -path $(COVERAGE) -prune \) \
	-name '*.js' -type f)

.PHONY: lint
lint: $(NODE_MODULES)
	@$(ESLINT) $(ALL_FILES)

.PHONY: test
test: $(NODE_MODULES)
	@$(JEST) 