default:
	@echo "please select a command from makefile"

component:
	@mkdir ./src/components/$(name)
	@touch ./src/components/$(name)/index.scss
	@touch ./src/components/$(name)/index.tsx
	@cat ./src/components/AComponentSnippet/index.tsx | sed 's?SnippetComponent?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?SnippetComponentDefaultProps?'$(name)DefaultProps'?' | sed 's?SnippetComponentPropType?'$(name)PropType'?' > ./src/components/$(name)/index.tsx
	@cat ./src/components/AComponentSnippet/index.scss | sed 's?some-classname?'$(name)'?'  > ./src/components/$(name)/index.scss

page:
	@mkdir ./src/pages/$(name)
	@touch ./src/pages/$(name)/index.scss
	@touch ./src/pages/$(name)/index.tsx
	@cat ./src/pages/APageSnippet/index.tsx | sed 's?SnippetPage?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?SnippetPageDefaultProps?'$(name)DefaultProps'?' | sed 's?SnippetPagePropType?'$(name)PropType'?'  > ./src/pages/$(name)/index.tsx
	@cat ./src/pages/APageSnippet/index.scss | sed 's?some-classname?'$(name)'?'  > ./src/pages/$(name)/index.scss
