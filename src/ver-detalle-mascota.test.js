import { crearVerDetalleMascota } from "./ver-detalle-mascota.js";

describe("verDetalleMascota", () => {
  let mascotasServiceMock;

  beforeEach(() => {
    document.body.innerHTML = '<div id="lista-mascotas"></div>';
    mascotasServiceMock = {
      obtenerMascotaPorId: jest.fn(),
      listarMascotas: jest.fn(),
    };
  });

  it("debería mostrar los detalles de la mascota correctamente", async () => {
    const mascotaMock = {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Labrador",
      edad: 5,
      foto: "https://example.com/foto-max.jpg",
    };

    mascotasServiceMock.obtenerMascotaPorId.mockResolvedValue(mascotaMock);
    
    const verDetalleMascota = crearVerDetalleMascota(mascotasServiceMock);
    
    await verDetalleMascota(1);

    const contenedor = document.querySelector("#lista-mascotas");
    const html = contenedor.innerHTML;

    expect(html).toContain("<h2>Max</h2>");
    expect(html).toContain("<p><strong>Especie:</strong> Perro</p>");
    expect(html).toContain("<p><strong>Raza:</strong> Labrador</p>");
    expect(html).toContain("<p><strong>Edad:</strong> 5</p>");
    expect(html).toContain('src="https://example.com/foto-max.jpg"');
  });

  it("debería manejar errores al obtener los detalles de la mascota", async () => {
    mascotasServiceMock.obtenerMascotaPorId.mockRejectedValue(
      new Error("Error de prueba")
    );

    const verDetalleMascota = crearVerDetalleMascota(mascotasServiceMock);

    await verDetalleMascota(999);

    const contenedor = document.querySelector("#lista-mascotas");
    expect(contenedor.innerHTML).toContain(
      "Error al cargar detalles: Error de prueba"
    );
  });
});