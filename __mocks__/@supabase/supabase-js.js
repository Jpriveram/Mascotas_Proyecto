const mockMascotas = [
  {
    id: 1,
    nombre: "Nube",
    especie: "Gato",
    raza: "Angora",
    edad: 8,
    foto: "nube.jpg",
  }
];

export const createClient = () => ({
  from: () => ({
    select: () => ({
      ilike: (columna, valor) => {
        const filtradas = mockMascotas.filter(
          (m) => m.raza.toLowerCase() === valor.toLowerCase()
        );

        return {
          data: filtradas,
          error: null,
        };
      }
    })
  })
});