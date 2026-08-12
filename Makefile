.PHONY: all install run dev build preview clean

all: run

install:
	@if [ ! -d "node_modules" ]; then \
		echo "Instalando dependencias con npm..."; \
		npm install; \
	fi

run: install
	@echo "Iniciando servidor de desarrollo..."
	npx vite

dev: install build
	@echo "Sirviendo build de producción localmente..."
	npx vite preview --port 4173

build: install
	@echo "Compilando para producción con comprobación estricta de tipos..."
	npx tsc --noEmit && npx vite build

clean:
	rm -rf dist node_modules
