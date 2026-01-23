// ============================================================================
// DATASET: PRECIOS DE ALQUILER EN MADRID 2025 - FASE 2 COMPLETA
// ============================================================================
// Fuentes: Idealista, Fotocasa, Bankinter, OCU, Indomio 2025
// FASE 2: 65 barrios de 10 distritos + 17 municipios área metropolitana
// Total: 82 ubicaciones
// ============================================================================

const barriosMadrid = [
    
    // ========================================================================
    // DISTRITO 1: CENTRO (6 barrios)
    // ========================================================================
    {
        id: 1,
        nombre: "Palacio",
        distrito: "Centro",
        lat: 40.4204,
        lng: -3.7143,
        zona: "Capital",
        subzona: "Centro",
        precioMedio: 1900,
        precioM2: 23.8,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Ubicación privilegiada junto al Palacio Real y Plaza de Oriente",
            "Teatro Real - principal escenario de ópera de España a menos de 200m",
            "Catedral de la Almudena y Jardines de Sabatini a 5 minutos andando", 
            "Excelente conexión de transporte: Ópera (L2, L5, Ramal Norte) y Sol (L1, L2, L3)",
            "Ambiente señorial y arquitectura histórica bien conservada",
            "Zona de alta seguridad con presencia policial constante",
            "Proximidad a restaurantes de lujo y comercios exclusivos en Calle del Arenal",
            "Vistas panorámicas únicas de Madrid desde la Cornisa del Palacio"
        ],
        desventajas: [
            "Precios de alquiler 40% superiores a la media de Madrid (€23.8/m²)",
            "Masificación turística permanente, especialmente en Plaza de Oriente",
            "Tráfico denso en Calles Bailén y Mayor con restricciones frecuentes",
            "Ruido constante por actividades turísticas hasta altas horas",
            "Falta de supermercados asequibles - predominan tiendas de lujo y souvenirs",
            "Dificultad extrema para aparcar - zona de máxima restricción ORA",
            "Escasez de servicios cotidianos como farmacias o bancos no turísticos"
        ]
    },
    {
        id: 2,
        nombre: "Embajadores (Lavapiés)",
        distrito: "Centro",
        lat: 40.4088,
        lng: -3.7055,
        zona: "Capital",
        subzona: "Centro",
        precioMedio: 1750,
        precioM2: 21.9,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Centro social autogestionado La Tabacalera - referente cultural alternativo",
            "Ambiente multicultural único con comunidades de más de 80 nacionalidades",
            "Mercado de San Fernando con productos internacionales y precios asequibles",
            "Excelente comunicación: Metro Lavapiés (L3), Embajadores (L3) y Atocha (L1) a 10 min",
            "Oferta gastronómica diversa: restaurantes indios, senegaleses, bangladesíes y fusión",
            "Galeries de arte independientes y talleres de artistas en Calles Tribulete y Amparo",
            "Proyectos comunitarios y asociaciones vecinales muy activas",
            "Rutas de tapas alternativas en Calles Argumosa y Ave María"
        ],
        desventajas: [
            "Edificios del siglo XIX sin ascensor en 70% de las viviendas",
            "Calles estrechas como la Cabeza o Sombrerete con acumulación de basura",
            "Proceso de gentrificación acelerado - precios subieron 22% en 2 años",
            "Percepción de inseguridad nocturna en zonas alejadas de calles principales",
            "Ruido constante por vida en la calle y comercio hasta tarde",
            "Dificultad para aparcar - zona de residentes muy disputada",
            "Conflicto vecinal entre tradición y nueva población gentrificada"
        ]
    },
    {
        id: 3,
        nombre: "Cortes (Huertas)",
        distrito: "Centro",
        lat: 40.4157,
        lng: -3.6961,
        zona: "Capital",
        subzona: "Centro",
        precioMedio: 2100,
        precioM2: 24.0,
        metrosCuadrados: 87,
        fuente: "Bankinter",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Corazón del Barrio de las Letras con citas literarias en adoquines",
            "A 5 minutos del Triángulo del Arte: Prado, Thyssen y Reina Sofía",
            "Plaza Santa Ana - epicentro de terrazas y vida social madrileña",
            "Excelente transporte: Sevilla (L2), Sol (L1,L2,L3) y Antón Martín (L1)",
            "Ambiente cultural vibrante con teatros como Español y La Latina",
            "Restaurantes de alta cocina en Calles Echegaray y Huertas",
            "Arquitectura histórica bien conservada con patios señoriales",
            "Proximidad a instituciones como Congreso de los Diputados"
        ],
        desventajas: [
            "Ruido nocturno extremo en calles Huertas y Príncipe hasta 4-5 AM",
            "Masificación turística permanente - difícil intimidad vecinal",
            "Precios de alquiler más altos de Centro (€24/m²)",
            "Problemas de limpieza en fin de semana por acumulación de residuos",
            "Imposible aparcar - zona turística con máxima rotación",
            "Comercios orientados al turismo, falta servicios cotidianos",
            "Viviendas antiguas con problemas de aislamiento acústico"
        ]
    },
    {
        id: 4,
        nombre: "Justicia (Chueca)",
        distrito: "Centro",
        lat: 40.4252,
        lng: -3.6981,
        zona: "Capital",
        subzona: "Centro",
        precioMedio: 2200,
        precioM2: 24.1,
        metrosCuadrados: 91,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Epicentro LGTBIQ+ de España con ambiente de tolerancia y diversidad",
            "Mercado de San Antón - gastronomía premium y rooftop con vistas",
            "Comercio de diseño independiente en Calles Hortaleza y Argensola",
            "Excelente comunicación: Metro Chueca (L5), Alonso Martínez (L4,L5,L10)",
            "Restaurantes de moda y cocina fusión en Calles Pelayo y Augusto Figueroa",
            "Eventos culturales constantes: Madrid Pride, festivales de diseño",
            "Ambiente cosmopolita con residentes internacionales y creativos",
            "Servicios especializados: gimnasios boutique, spas y wellness centers"
        ],
        desventajas: [
            "Precios premium - alquileres 45% superiores a media madrileña",
            "Masificación los fines de semana - calles colapsadas de viernes a domingo",
            "Ruido nocturno constante en Plaza de Chueca y calles aledañas",
            "Aparcamiento prácticamente imposible - zona de máxima restricción",
            "Gentrificación extrema - desplazamiento de comercio tradicional",
            "Viviendas reformadas pero con precios de lujo en edificios antiguos",
            "Falta de tranquilidad - actividad comercial y ocio 24/7"
        ]
    },
    {
        id: 5,
        nombre: "Universidad (Malasaña)",
        distrito: "Centro",
        lat: 40.4266,
        lng: -3.7073,
        zona: "Capital",
        subzona: "Centro",
        precioMedio: 2100,
        precioM2: 24.4,
        metrosCuadrados: 86,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Cuna de la Movida Madrileña con ambiente creativo y alternativo",
            "Plaza del 2 de Mayo - epicentro de terrazas y vida social juvenil",
            "Comercio vintage y tiendas independientes en Calles Velarde y Espíritu Santo",
            "Excelente transporte: Tribunal (L1,L10), Bilbao (L1,L4) y San Bernardo (L2,L4)",
            "Oferta cultural en centros como Instituto Europeo de Design y galerías urbanas",
            "Bares de cócteles de autor y gastronomía trendy en Calles Corredera Alta y San Vicente Ferrer",
            "Ambiente joven y dinámico con eventos como Mercado de Motores",
            "Arquitectura tradicional con patios reconvertidos en espacios coworking"
        ],
        desventajas: [
            "Gentrificación avanzada - precios subieron 35% en últimos 3 años",
            "Saturación turística en calles Fuencarral y Gran Vía los fines de semana",
            "Ruido constante hasta 4-5 AM en zonas de ocio nocturno",
            "Viviendas pequeñas y antiguas con precios de barrio premium",
            "Dificultad para residentes tradicionales por cambio de comercio local",
            "Aparcamiento caótico - una de las zonas más conflictivas de Madrid",
            "Masificación en horarios de tapeo y copas - colas en bares populares"
        ]
    },
    {
        id: 6,
        nombre: "Sol",
        distrito: "Centro",
        lat: 40.4168,
        lng: -3.7038,
        zona: "Capital",
        subzona: "Centro",
        precioMedio: 2050,
        precioM2: 23.8,
        metrosCuadrados: 86,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Kilómetro 0 de España - centro neurálgico de la red de carreteras nacional",
            "Conexión de transporte excepcional: Sol (L1,L2,L3) y múltiples líneas de bus",
            "Plaza Mayor a 2 minutos - arquitectura histórica y eventos culturales",
            "Acceso inmediato a centros comerciales como El Corte Inglés Callao",
            "Puerta del Sol - reloj de la Casa de Correos y emblemática estatua del Oso y el Madroño",
            "Calle Preciados - principal eje comercial peatonal de Madrid",
            "Servicios 24/7: farmacias de guardia, comisarías centrales, oficinas de turismo",
            "Proximidad a instituciones como Comunidad de Madrid y Real Casa de Correos"
        ],
        desventajas: [
            "Masificación turística extrema - más de 300.000 personas diarias en temporada alta",
            "Ruido constante 24/7 por tráfico, turistas y actividades comerciales",
            "Precios inflados en comercios y restaurantes orientados al turismo",
            "Imposible tranquilidad - ambiente de 'no parque temático' permanente",
            "Seguridad complicada en horas nocturnas por concentración de botellón",
            "Falta absoluta de aparcamiento - zona de máxima restricción y rotación",
            "Comercio local desaparecido - sustituido por franquicias y tiendas de souvenirs"
        ]
    },

    // ========================================================================
    // DISTRITO 2: SALAMANCA (6 barrios)
    // ========================================================================
    {
        id: 7,
        nombre: "Recoletos",
        distrito: "Salamanca",
        lat: 40.4238,
        lng: -3.6866,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 2400,
        precioM2: 26.8,
        metrosCuadrados: 90,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Paseo de Recoletos - una de las avenidas más exclusivas de Europa",
            "Biblioteca Nacional y Museo Arqueológico Nacional a menos de 200m",
            "Arquitectura señorial del siglo XIX con fachadas perfectamente conservadas",
            "Barrio más seguro de Madrid con presencia policial y seguridad privada",
            "Cercanía a parques emblemáticos: Jardines del Descubrimiento y Retiro",
            "Restaurantes con estrella Michelin y gastronomía de alta gama",
            "Comercio de lujo en Calles Serrano y Velázquez a 5 minutos andando",
            "Excelente transporte: Colón (L4), Serrano (L4) y Recoletos (Cercanías)"
        ],
        desventajas: [
            "Precio más elevado de Madrid - €26.8/m², 60% superior a la media",
            "Ambiente excesivamente formal y conservador - poco diversidad social",
            "Comercio exclusivamente de lujo - falta supermercados y tiendas cotidianas",
            "Estacionamiento en garajes privados desde €250-€400 mensuales",
            "Vida nocturna casi inexistente - ambiente residencial muy tranquilo",
            "Edificios con normas de comunidad estrictas y conservadoras",
            "Alejado de ambiente auténtico madrileño - muy internacional y elitista"
        ]
    },
    {
        id: 8,
        nombre: "Goya",
        distrito: "Salamanca",
        lat: 40.4255,
        lng: -3.6701,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 2200,
        precioM2: 22.2,
        metrosCuadrados: 99,
        fuente: "Bankinter",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Calle Goya - eje comercial principal con 1.5km de tiendas y servicios",
            "Estación de metro Goya (L2, L4) - una de las mejor conectadas de Madrid",
            "Zona residencial consolidada con amplias viviendas familiares (media 99m²)",
            "Servicios de alta calidad: colegios privados, clínicas exclusivas, bancos",
            "Mercado de la Paz - productos gourmet y gastronomía de calidad",
            "Proximidad a Parque del Retiro - acceso a 10 minutos andando",
            "Ambiente tranquilo y familiar con amplias aceras y zonas arboladas",
            "Comercio especializado: moda infantil, decoración y servicios premium"
        ],
        desventajas: [
            "Tráfico intenso en Calle Goya - congestión constante en horas punta",
            "Precios elevados - 35% superiores a la media madrileña",
            "Vida nocturna casi inexistente - ambiente residencial muy tranquilo",
            "Edificios de los años 60-70 sin reformar en calles secundarias",
            "Falta de diversidad social y cultural - perfil socioeconómico homogéneo",
            "Aparcamiento complicado a pesar de ser zona residencial",
            "Comercio muy convencional - pocas opciones alternativas o jóvenes"
        ]
    },
    {
        id: 9,
        nombre: "Fuente del Berro",
        distrito: "Salamanca",
        lat: 40.4331,
        lng: -3.6574,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1850,
        precioM2: 18.6,
        metrosCuadrados: 99,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Parque Quinta de la Fuente del Berro - jardín histórico del siglo XVII con especies botánicas únicas",
            "Precios más asequibles que el resto de Salamanca - 15% menos que Goya/Serrano",
            "Zona residencial muy tranquila con calles arboladas y poco tráfico",
            "Excelente conexión con M-30 - acceso directo en 2 minutos por Avenida de la Paz",
            "Ambiente familiar y seguro - una de las zonas preferidas por familias del distrito",
            "Mercado de San Pascual - comercio tradicional con productos de calidad",
            "Colegios públicos y privados de prestigio en radio cercano",
            "Viviendas espaciosas con terrazas y zonas comunes amplias"
        ],
        desventajas: [
            "Alejado del centro del distrito - 20-25 minutos andando a Serrano/Goya",
            "Comercio limitado comparado con ejes principales del barrio de Salamanca",
            "Metro más alejado: Ventas (L5) a 10-15 minutos andando para algunas calles",
            "Edificios de los años 70-80 sin las reformas de lujo de otras zonas de Salamanca",
            "Menos servicios de ocio y restauración - predominio de comercio local básico",
            "Falta de ambiente juvenil - población mayoritariamente familiar y senior",
            "Transporte público menos frecuente que en zonas céntricas del distrito"
        ]
    },
    {
        id: 10,
        nombre: "Guindalera",
        distrito: "Salamanca",
        lat: 40.4409,
        lng: -3.6678,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1600,
        precioM2: 18.9,
        metrosCuadrados: 85,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "La opción más asequible del distrito Salamanca - 25% más barato que Goya",
            "Parque de Eva Perón - amplia zona verde con áreas infantiles y deportivas",
            "Ambiente familiar muy tranquilo - calles residenciales poco transitadas",
            "Excelente conexión de transporte: Diego de León (L4,L5,L6,L7) y Avenida de América",
            "Mercado de la Guindalera - comercio tradicional con precios razonables",
            "Proximidad a centros comerciales como ABC Serrano y El Corte Inglés de Avenida de América",
            "Colegios públicos bien valorados y guarderías en zona cercana",
            "Zona en proceso de renovación con nuevas promociones residenciales"
        ],
        desventajas: [
            "Menor prestigio que el resto de Salamanca - considerado 'el hermano pobre' del distrito",
            "Alejado de la zona comercial premium de Serrano/Goya - 30 minutos andando",
            "Edificación de los años 60-70 sin el glamour de la arquitectura señorial salamantina",
            "Servicios menos exclusivos - predominio de comercio básico y cadenas estándar",
            "Menos ambiente y vida social - zona principalmente dormitorio",
            "Tráfico en calles periféricas como Francisco Silvela y Doctor Esquerdo",
            "Falta de identidad propia - transición entre Salamanca y Chamartín"
        ]
    },
    {
        id: 11,
        nombre: "Lista",
        distrito: "Salamanca",
        lat: 40.4328,
        lng: -3.6756,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 2100,
        precioM2: 24.0,
        metrosCuadrados: 87,
        fuente: "Fotocasa",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Calle Ortega y Gasset - eje de comercio de lujo con boutiques internacionales",
            "Zona residencial consolidada y elegante con arquitectura señorial bien conservada",
            "Nudo de transporte Diego de León (L4,L5,L6,L7) - mejor conectado del distrito",
            "Comercio variado desde alta gama hasta cadenas internacionales en Calles López de Hoyos y Príncipe de Vergara",
            "Ambiente sofisticado con galerías de arte y anticuarios en Calles Juan Bravo y Lagasca",
            "Servicios premium: clínicas privadas exclusivas, consulados y oficinas corporativas",
            "Proximidad a Parque de la Fuente del Berro y Quinta de los Molinos",
            "Restaurantes de alta cocina y gastronomía internacional en Calles Padilla y Ayala"
        ],
        desventajas: [
            "Precios entre los más altos de Salamanca - €24/m² solo superado por Recoletos",
            "Tráfico intenso constante en ejes principales como Ortega y Gasset y Príncipe de Vergara",
            "Aparcamiento extremadamente complicado - zona comercial con alta rotación",
            "Vida nocturna casi inexistente - ambiente residencial y comercial diurno",
            "Masificación en horas comerciales - calles colapsadas de compradores",
            "Edificios con normas de comunidad muy estrictas y conservadoras",
            "Falta de diversidad social - perfil socioeconómico muy homogéneo y alto"
        ]
    },
    {
        id: 12,
        nombre: "Castellana",
        distrito: "Salamanca",
        lat: 40.4386,
        lng: -3.6873,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 2350,
        precioM2: 25.0,
        metrosCuadrados: 94,
        fuente: "Bankinter",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Paseo de la Castellana - principal arteria de Madrid con arquitectura emblemática",
            "Edificios corporativos y residenciales de alta gama con vistas panorámicas",
            "Zona empresarial premium con sedes de multinacionales e instituciones financieras",
            "Excelentes comunicaciones: Cuzco (L10), Santiago Bernabéu (L10) y Nuevos Ministerios (L6,L8,L10,Cercanías)",
            "Torres emblemáticas como Picasso, Europa y Space con servicios de lujo",
            "Proximidad al estadio Santiago Bernabéu y centros de convenciones IFEMA",
            "Seguridad y vigilancia 24/7 en zona de alto valor corporativo",
            "Gastronomía ejecutiva y restaurantes de negocios de alta gama"
        ],
        desventajas: [
            "Segundo barrio más caro de Madrid - solo superado por Recoletos en precio",
            "Tráfico intenso constante en Paseo de la Castellana - ruido permanente",
            "Ambiente excesivamente corporativo - vacío los fines de semana y noches",
            "Comercio de proximidad casi inexistente - predominio de oficinas y restaurantes ejecutivos",
            "Falta de vida vecinal auténtica - población flotante de ejecutivos internacionales",
            "Aparcamiento en garajes privados desde €300-€500 mensuales",
            "Zona fría y impersonal - carece del carácter tradicional madrileño"
        ]
    },

    // ========================================================================
    // DISTRITO 3: RETIRO (6 barrios)
    // ========================================================================
    {
        id: 13,
        nombre: "Pacífico",
        distrito: "Retiro",
        lat: 40.4044,
        lng: -3.6723,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1600,
        precioM2: 19.5,
        metrosCuadrados: 82,
        fuente: "Fotocasa",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Estación de Atocha a 10 minutos - conexión nacional e internacional de trenes",
            "Excelente comunicación: Metro Pacífico (L6), Menéndez Pelayo (L1) y Cercanías",
            "Precio más razonable del distrito Retiro - 20% más barato que Jerónimos",
            "Barrio tranquilo y residencial con calles poco transitadas",
            "Mercado de Pacífico - comercio tradicional con precios asequibles",
            "Centros de salud y colegios públicos bien dotados en zona cercana",
            "Proceso de renovación urbana con nuevas promociones residenciales",
            "Fácil acceso a M-30 y salidas de ciudad por Avenida de la Ciudad de Barcelona"
        ],
        desventajas: [
            "Menos zonas verdes que otros barrios de Retiro - alejado del parque principal",
            "Tráfico constante de Atocha y estación de autobuses en calles aledañas",
            "Edificios de los años 60-70 envejecidos sin reformas integrales",
            "Comercio local limitado - predominio de cadenas estándar y servicios básicos",
            "Ambiente menos exclusivo que otras zonas del distrito Retiro",
            "Aparcamiento complicado en horas laborables por proximidad a estación",
            "Falta de identidad propia - zona de transición entre centro y periferia"
        ]
    },
    {
        id: 14,
        nombre: "Adelfas",
        distrito: "Retiro",
        lat: 40.3984,
        lng: -3.6602,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1550,
        precioM2: 19.0,
        metrosCuadrados: 82,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio más bajo del distrito Retiro - 30% más económico que Jerónimos",
            "Acceso directo a M-30 - salidas rápidas a cualquier punto de Madrid",
            "Zona residencial familiar con parques infantiles y áreas deportivas",
            "Parque de la Arganzuela y Madrid Río a 15 minutos andando",
            "Comunicación aceptable: Metro Conde de Casal (L6) y múltiples líneas de bus",
            "Comercio local asequible en Calles Martínez de la Riva y Doctor Esquerdo",
            "Ambiente tranquilo y seguro - preferido por familias jóvenes",
            "Proceso de mejora urbana con nuevas zonas verdes y equipamientos"
        ],
        desventajas: [
            "Más alejado del Parque del Retiro - 25-30 minutos andando",
            "Menos servicios premium que otras zonas del distrito",
            "Edificios de los años 70 con necesidades de reforma",
            "Ambiente más periférico - carece del carácter señorial de Retiro",
            "Transporte público menos frecuente que en zonas céntricas",
            "Falta de oferta cultural y de ocio - principalmente zona dormitorio",
            "Comercio básico - pocas opciones de restauración y ocio nocturno"
        ]
    },
    {
        id: 15,
        nombre: "Estrella",
        distrito: "Retiro",
        lat: 40.4089,
        lng: -3.6638,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1700,
        precioM2: 20.5,
        metrosCuadrados: 83,
        fuente: "Bankinter",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "A 10 minutos del Parque del Retiro - acceso por Puerta de O'Donnell",
            "Zona tranquila y señorial con arquitectura bien conservada",
            "Colegios públicos y concertados de prestigio en radio cercano",
            "Calles arboladas y amplias aceras - ideal para familias",
            "Ambiente residencial de calidad con baja densidad de tráfico",
            "Mercado de la Estrella - productos frescos y comercio tradicional",
            "Proximidad a instalaciones deportivas del Canal de Isabel II",
            "Arquitectura de los años 40-50 bien mantenida con carácter histórico"
        ],
        desventajas: [
            "Metro más alejado - Ibiza (L9) a 10-15 minutos andando para algunas calles",
            "Comercio de proximidad limitado - pocas opciones de ocio y restauración",
            "Aparcamiento complicado - zona residencial con alta ocupación",
            "Precios en alza constante - gentrificación en proceso",
            "Vida nocturna casi inexistente - ambiente familiar y tranquilo",
            "Falta de diversidad generacional - población mayoritariamente estable",
            "Servicios concentrados en ejes principales - dispersión en calles interiores"
        ]
    },
    {
        id: 16,
        nombre: "Ibiza",
        distrito: "Retiro",
        lat: 40.4012,
        lng: -3.6589,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1950,
        precioM2: 22.5,
        metrosCuadrados: 87,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Junto al Parque del Retiro - acceso directo por Puerta de Ibiza",
            "Zona muy residencial exclusiva con calles amplias y arboladas",
            "Arquitectura señorial y edificios de calidad bien conservados",
            "Ambiente exclusivo y tranquilo - uno de los preferidos de Retiro",
            "Metro Ibiza (L9) a menos de 5 minutos - buena conexión con centro",
            "Colegios internacionales y centros educativos de élite cercanos",
            "Servicios de calidad: clínicas privadas, boutiques y restaurantes selectos",
            "Seguridad y tranquilidad - una de las zonas más seguras de Madrid"
        ],
        desventajas: [
            "Precios elevados - entre los más altos del distrito después de Jerónimos",
            "Comercio muy limitado - pocas opciones de compras y ocio",
            "Excesiva tranquilidad para algunos - falta de vida social activa",
            "Edificios antiguos sin modernizar en algunas manzanas",
            "Aparcamiento muy disputado - zona residencial de alta demanda",
            "Falta de diversidad - perfil socioeconómico muy homogéneo",
            "Alejado de centros de ocio y vida nocturna - ambiente estrictamente residencial"
        ]
    },
    {
        id: 17,
        nombre: "Jerónimos",
        distrito: "Retiro",
        lat: 40.4142,
        lng: -3.6866,
        zona: "Capital",
        subzona: "Centro-Este",
        precioMedio: 2200,
        precioM2: 24.0,
        metrosCuadrados: 92,
        fuente: "Bankinter",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Ubicación privilegiada junto a Museo del Prado y Reina Sofía",
            "Zona monumental icónica - Puerta de Alcalá, Cibeles y Fuente de Neptuno",
            "Acceso directo al Parque del Retiro por puertas principales",
            "Máximo prestigio residencial - dirección de lujo en Madrid",
            "Excelente comunicación: Banco de España (L2), Retiro (L2) y Atocha",
            "Arquitectura palaciega y edificios históricos perfectamente conservados",
            "Ambiente cultural excepcional - rodeado de museos e instituciones",
            "Seguridad y exclusividad - una de las zonas más vigiladas de Madrid"
        ],
        desventajas: [
            "Precios muy elevados - entre los 5 más caros de toda Madrid",
            "Masificación turística permanente - difícil intimidad vecinal",
            "Comercio cotidiano casi inexistente - todo orientado al turismo cultural",
            "Tráfico constante en Paseo del Prado y calles aledañas",
            "Imposible aparcamiento - zona de máxima restricción y rotación",
            "Falta de servicios básicos - farmacias, supermercados escasos",
            "Edificios con normas de comunidad muy restrictivas y conservadoras"
        ]
    },
    {
        id: 18,
        nombre: "Niño Jesús",
        distrito: "Retiro",
        lat: 40.4120,
        lng: -3.6781,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1800,
        precioM2: 21.0,
        metrosCuadrados: 86,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Hospital Infantil Niño Jesús - centro de referencia nacional pediátrica",
            "A 8 minutos del Parque del Retiro - acceso por Puerta de Sainz de Baranda",
            "Zona residencial consolidada con edificios bien conservados",
            "Excelente relación calidad-precio dentro del distrito Retiro",
            "Comunicación aceptable: Ibiza (L9) y O'Donnell (L6) a 10-12 minutos",
            "Ambiente tranquilo y familiar - baja densidad de tráfico",
            "Colegios públicos y privados de calidad en zona cercana",
            "Comercio local en Calles Doctor Esquerdo y Menorca"
        ],
        desventajas: [
            "Alejado del centro histórico - 25-30 minutos andando a Sol",
            "Tráfico hospitalario constante en Calles Menéndez Pelayo y Doctor Esquerdo",
            "Comercio limitado comparado con otras zonas de Retiro",
            "Metro más distante que en barrios céntricos del distrito",
            "Falta de vida nocturna - ambiente estrictamente residencial",
            "Edificios de los años 50-60 sin el glamour de otras zonas de Retiro",
            "Servicios concentrados en ejes principales - dispersión en interiores"
        ]
    },

    // ========================================================================
    // DISTRITO 4: CHAMBERÍ (6 barrios)
    // ========================================================================
    {
        id: 19,
        nombre: "Gaztambide",
        distrito: "Chamberí",
        lat: 40.4372,
        lng: -3.7182,
        zona: "Capital",
        subzona: "Noroeste",
        precioMedio: 1900,
        precioM2: 23.0,
        metrosCuadrados: 83,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Junto a Ciudad Universitaria - ambiente joven y dinámico",
            "Precio más razonable de Chamberí - 15% menos que Almagro",
            "Buena conexión con Moncloa y Argüelles - Metro Islas Filipinas (L7)",
            "Comercio local auténtico en Calles Gaztambide y Fernández de los Ríos",
            "Ambiente multicultural con estudiantes y jóvenes profesionales",
            "Proceso de renovación con nuevos comercios y restaurantes trendy",
            "Fácil acceso a zonas verdes: Parque de la Bombilla y Oeste",
            "Arquitectura tradicional madrileña con patios interiores"
        ],
        desventajas: [
            "Ruido universitario en periodos de exámenes y fiestas",
            "Alejado del centro de Chamberí - 15-20 minutos andando a Plaza Olavide",
            "Tráfico intenso en Cea Bermúdez y Avenida de la Reina Victoria",
            "Aparcamiento muy complicado - alta densidad de residentes y estudiantes",
            "Edificios antiguos con necesidades de reforma en algunas zonas",
            "Falta de zonas verdes dentro del propio barrio",
            "Comercio básico - pocas opciones de lujo o especializadas"
        ]
    },
    {
        id: 20,
        nombre: "Arapiles",
        distrito: "Chamberí",
        lat: 40.4324,
        lng: -3.7117,
        zona: "Capital",
        subzona: "Centro-Oeste",
        precioMedio: 1950,
        precioM2: 23.5,
        metrosCuadrados: 83,
        fuente: "Bankinter",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Ubicación céntrica - a 15 minutos andando de Plaza de España",
            "Templo de Debod y Parque del Oeste a 8 minutos andando",
            "Excelente comunicación: Metro Argüelles (L3,L4,L6) y San Bernardo (L2,L4)",
            "Comercio variado en Calles Alberto Aguilera y Princesa",
            "Zona residencial consolidada con buena mezcla de residentes",
            "Arquitectura tradicional bien conservada con carácter histórico",
            "Ambiente tranquilo pero bien conectado - equilibrio perfecto",
            "Proximidad a colegios y universidades: Complutense y centros privados"
        ],
        desventajas: [
            "Edificios antiguos con problemas de mantenimiento en patios interiores",
            "Calles estrechas como Arapiles y Magallanes con difícil acceso",
            "Precios en fuerte alza - +20% en últimos 2 años por gentrificación",
            "Aparcamiento extremadamente complicado - zona de alta densidad",
            "Falta de plazas de garaje en edificios históricos",
            "Ruido de tráfico en ejes principales como Alberto Aguilera",
            "Presión turística por proximidad a Templo de Debod"
        ]
    },
    {
        id: 21,
        nombre: "Trafalgar",
        distrito: "Chamberí",
        lat: 40.4283,
        lng: -3.7065,
        zona: "Capital",
        subzona: "Centro",
        precioMedio: 2100,
        precioM2: 24.5,
        metrosCuadrados: 86,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Corazón de Chamberí - Plaza de Olavide como centro neurálgico",
            "Calle Fuencarral - eje comercial principal con tiendas y restaurantes",
            "Excelente transporte: Bilbao (L1,L4), Iglesia (L1) y Quevedo (L2)",
            "Arquitectura señorial perfectamente conservada del siglo XIX",
            "Ambiente vibrante pero residencial - equilibrio perfecto",
            "Comercio de calidad: boutiques, delicatessen y restaurantes gourmet",
            "Plaza de Olavide - zona peatonal con terrazas y ambiente familiar",
            "Servicios de proximidad excelentes: farmacias, bancos, colegios"
        ],
        desventajas: [
            "Precios premium - entre los más altos de Chamberí",
            "Calles muy transitadas - difícil tranquilidad en ejes comerciales",
            "Ruido constante de comercio y terrazas hasta altas horas",
            "Espacios verdes limitados - solo pequeñas plazas ajardinadas",
            "Aparcamiento caótico - una de las zonas más conflictivas de Madrid",
            "Masificación en fines de semana - colapsado de compradores",
            "Presión turística por conexión con Malasaña y Centro"
        ]
    },
    {
        id: 22,
        nombre: "Almagro",
        distrito: "Chamberí",
        lat: 40.4337,
        lng: -3.6965,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 2150,
        precioM2: 24.8,
        metrosCuadrados: 87,
        fuente: "Bankinter",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Uno de los barrios más elegantes de Madrid - dirección de prestigio",
            "Junto a Paseo de la Castellana - conexión directa con centro financiero",
            "Embajadas y edificios señoriales perfectamente conservados",
            "Máxima calidad de vida - tranquilidad y exclusividad",
            "Excelente comunicación: Rubén Darío (L5), Alonso Martínez (L4,L5,L10)",
            "Comercio exclusivo en Calles Génova y Zurbano - boutiques y anticuarios",
            "Seguridad y privacidad - una de las zonas más seguras de Madrid",
            "Arquitectura de lujo con amplias viviendas y zonas comunes"
        ],
        desventajas: [
            "Precios muy elevados - entre los 3 más caros de Chamberí",
            "Ambiente excesivamente formal y conservador",
            "Comercio cotidiano casi inexistente - todo orientado al lujo",
            "Aparcamiento imposible - zona de máxima restricción y embajadas",
            "Vida nocturna nula - ambiente estrictamente residencial y diplomático",
            "Falta de diversidad social - perfil socioeconómico muy alto",
            "Edificios con normas de comunidad extremadamente restrictivas"
        ]
    },
    {
        id: 23,
        nombre: "Vallehermoso",
        distrito: "Chamberí",
        lat: 40.4422,
        lng: -3.7101,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1880,
        precioM2: 22.8,
        metrosCuadrados: 82,
        fuente: "Fotocasa",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Mercado de Vallehermoso renovado - gastronomía y productos gourmet",
            "Ambiente de barrio auténtico - mezcla de tradición y modernidad",
            "Polideportivo Canal Isabel II - instalaciones deportivas de calidad",
            "Zona verde del Canal - espacios abiertos y áreas de paseo",
            "Comercio local en Calles Vallehermoso y Santísima Trinidad",
            "Arquitectura tradicional con carácter - patios y corralas",
            "Proceso de revitalización con nuevos residentes jóvenes",
            "Precio más asequible que otros barrios de Chamberí"
        ],
        desventajas: [
            "Alejado del centro de Chamberí - 20 minutos andando a Plaza Olavide",
            "Cuestas pronunciadas en Calles Martínez Campos y Vallehermoso",
            "Metro más distante: Canal (L2,L7) a 10-15 minutos para algunas calles",
            "Edificios antiguos con necesidades de reforma y mantenimiento",
            "Tráfico en Avenida de Filipinas y Guzmán el Bueno",
            "Falta de zonas verdes propias - dependencia del Canal",
            "Comercio básico - pocas opciones de ocio y restauración"
        ]
    },
    {
        id: 24,
        nombre: "Ríos Rosas",
        distrito: "Chamberí",
        lat: 40.4437,
        lng: -3.7001,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1800,
        precioM2: 22.0,
        metrosCuadrados: 82,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Cerca de Nuevos Ministerios - conexión con centro empresarial",
            "Excelente transporte: Ríos Rosas (L1), Cuatro Caminos (L1,L2,L6)",
            "Precio más contenido de Chamberí - opción económica del distrito",
            "Zona tranquila y residencial con baja densidad comercial",
            "Escuelas de ingeniería: Minas y Industriales - ambiente universitario",
            "Fácil acceso a Castellana y centros de negocios",
            "Arquitectura funcional pero bien conservada",
            "Proximidad a Parque de Santander y zonas deportivas"
        ],
        desventajas: [
            "Ambiente algo impersonal - zona de transición entre distritos",
            "Tráfico de oficinas en horas punta - Calles Raimundo Fernández Villaverde",
            "Comercio local limitado - pocas opciones de calidad",
            "Ambiente corporativo - vacío los fines de semana",
            "Falta de identidad propia - entre Chamberí y Tetuán",
            "Edificios de oficinas mezclados con residencial - menos cohesión vecinal",
            "Pocos espacios verdes - dependencia de parques exteriores"
        ]
    },

    // ========================================================================
    // DISTRITO 5: PUENTE DE VALLECAS (6 barrios)
    // ========================================================================
    {
        id: 25,
        nombre: "Entrevías",
        distrito: "Puente de Vallecas",
        lat: 40.3846,
        lng: -3.6521,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1100,
        precioM2: 13.7,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Precio más bajo del distrito - 60% más barato que media Madrid",
            "Metro Buenos Aires (L1) - conexión directa con centro en 20 minutos",
            "Barrio obrero auténtico - fuerte identidad comunitaria",
            "En proceso de renovación - mejoras urbanísticas en curso",
            "Comercio muy económico - precios asequibles en alimentación y servicios",
            "Asociaciones vecinales muy activas - tejido social fuerte",
            "Fácil aparcamiento - menor densidad vehicular que centro",
            "Proximidad a M-40 - salidas rápidas a otras zonas"
        ],
        desventajas: [
            "Imagen social negativa - estigmatización histórica del barrio",
            "Edificios muy antiguos de los años 50-60 con carencias",
            "Muy alejado del centro de Madrid - 30-40 minutos en transporte",
            "Pocas zonas verdes - carencia de parques y áreas recreativas",
            "Servicios públicos limitados - centros de salud y educativos saturados",
            "Desempleo superior a media madrileña - problemas económicos",
            "Falta de inversión privada - comercio básico y poco diversificado"
        ]
    },
    {
        id: 26,
        nombre: "San Diego",
        distrito: "Puente de Vallecas",
        lat: 40.3918,
        lng: -3.6634,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1250,
        precioM2: 15.6,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio económico - 50% más barato que media Madrid",
            "Buena conexión de metro: Portazgo (L1) y Congosto (L1)",
            "Zona multicultural - diversidad de nacionalidades y culturas",
            "Comercio de proximidad muy económico en Avenida de la Albufera",
            "Mercado de San Diego - productos frescos a precios asequibles",
            "Ambiente comercial vibrante - todo tipo de servicios básicos",
            "Fácil aparcamiento comparado con zonas céntricas",
            "Comunidad vecinal activa - eventos y fiestas populares"
        ],
        desventajas: [
            "Alta densidad poblacional - edificios con muchas viviendas",
            "Edificios de los años 60-70 con necesidades de reforma",
            "Pocas opciones de ocio y cultura - limitado a comercio básico",
            "Percepción de barrio obrero - estigma social persistente",
            "Tráfico intenso en Avenida de la Albufera - principal eje",
            "Falta de zonas verdes - espacios públicos limitados",
            "Servicios educativos y sanitarios saturados por alta demanda"
        ]
    },
    {
        id: 27,
        nombre: "Palomeras Bajas",
        distrito: "Puente de Vallecas",
        lat: 40.3859,
        lng: -3.6423,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1280,
        precioM2: 16.0,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Parque de Palomeras - zona verde amplia con áreas deportivas",
            "Precio asequible - opción económica para familias",
            "Zona familiar - ambiente tranquilo y seguro",
            "Buena conexión: Metro Buenos Aires (L1) y Vinateros (L1)",
            "Comercio local en Calles Arroyo del Olivar y Sierra Toledana",
            "Colegios públicos y centros de salud en radio cercano",
            "Aparcamiento más fácil que en barrios céntricos",
            "Proceso de mejora urbana con renovación de espacios"
        ],
        desventajas: [
            "Muy alejado del centro de Madrid - 35-40 minutos en transporte",
            "Edificios monótonos de promoción pública años 70-80",
            "Poco atractivo urbanístico - arquitectura repetitiva",
            "Servicios básicos - falta de opciones culturales y de ocio",
            "Dependencia del automóvil - transporte público limitado",
            "Falta de diversidad comercial - todo orientado a necesidades básicas",
            "Aislamiento relativo - percepción de barrio periférico"
        ]
    },
    {
        id: 28,
        nombre: "Palomeras Sureste",
        distrito: "Puente de Vallecas",
        lat: 40.3796,
        lng: -3.6342,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1300,
        precioM2: 16.2,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio económico - opción más asequible de Vallecas",
            "Cerca del Parque Forestal de Entrevías - amplia zona verde",
            "Zona residencial tranquila - menor densidad que otros barrios",
            "Viviendas más amplias - promociones de los 80 con mejores espacios",
            "Comercio básico en Calles Sierra de Guadalupe y Sierra de Gredos",
            "Ambiente familiar - preferido por familias con niños",
            "Aparcamiento relativamente fácil - menor presión vehicular",
            "Proceso de renovación con mejoras en infraestructuras"
        ],
        desventajas: [
            "Zona muy periférica - límite sureste de Madrid capital",
            "Metro algo alejado - Entrevías (L1) a 15-20 minutos andando",
            "Pocas opciones culturales y de ocio - todo muy básico",
            "Gran distancia al centro - 45-50 minutos en transporte público",
            "Dependencia total de comercio local - pocas alternativas",
            "Falta de servicios especializados - todo concentrado en ejes principales",
            "Aislamiento geográfico - percepción de barrio desconectado"
        ]
    },
    {
        id: 29,
        nombre: "Portazgo",
        distrito: "Puente de Vallecas",
        lat: 40.3962,
        lng: -3.6503,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1320,
        precioM2: 16.5,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Metro Portazgo (L1) - conexión directa con centro en 18 minutos",
            "Centro Comercial Alcampo - hipermercado y tiendas a precios económicos",
            "Hospital Infanta Leonor - centro sanitario de referencia del sureste",
            "Precio razonable para la zona - 35% más barato que media Madrid",
            "Comercio local muy económico en Avenida de la Albufera",
            "Fácil acceso a M-40 - salidas rápidas a otras zonas",
            "Asociaciones vecinales activas - fuerte tejido comunitario",
            "Aparcamiento relativamente fácil - menor presión que centro"
        ],
        desventajas: [
            "Zona comercial saturada - tráfico constante en ejes principales",
            "Tráfico intenso en Avenida de la Albufera - principal arteria del distrito",
            "Estética urbana mejorable - fachadas descuidadas y espacios públicos",
            "Muy alejado del centro - 30-35 minutos en transporte público",
            "Falta de zonas verdes - carencia de parques y áreas recreativas",
            "Comercio básico - pocas opciones de calidad o especializadas",
            "Imagen de barrio obrero - estigmatización social persistente"
        ]
    },
    {
        id: 30,
        nombre: "Numancia",
        distrito: "Puente de Vallecas",
        lat: 40.4015,
        lng: -3.6565,
        zona: "Capital",
        subzona: "Sureste",
        precioMedio: 1400,
        precioM2: 17.5,
        metrosCuadrados: 80,
        fuente: "Bankinter",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Zona más valorada de Vallecas - mejor reputación del distrito",
            "Metro Nueva Numancia (L1) - conexión excelente con centro",
            "Mejor conexión que otros barrios - acceso rápido a M-30",
            "Comercio más diversificado en Avenida de la Albufera",
            "Edificios mejor conservados - promociones más recientes",
            "Ambiente más familiar - mezcla de residentes consolidada",
            "Servicios públicos de mejor calidad - centros educativos y sanitarios",
            "Proceso de mejora urbana más avanzado que en otros barrios"
        ],
        desventajas: [
            "Aún lejos del centro de Madrid - 25-30 minutos en transporte",
            "Precio 300€ más que Entrevías - diferencia significativa dentro del distrito",
            "Tráfico de M-30 cercano - ruido y contaminación en calles limítrofes",
            "Menos servicios que zonas céntricas - todo más básico",
            "Presión de gentrificación - precios en alza constante",
            "Falta de opciones de ocio y cultura - limitado a comercio básico",
            "Estigma de Vallecas persistente - aunque menor que en otros barrios"
        ]
    },

    // ========================================================================
    // DISTRITO 6: CHAMARTÍN (6 barrios) - NUEVO FASE 2
    // ========================================================================
    {
        id: 31,
        nombre: "El Viso",
        distrito: "Chamartín",
        lat: 40.4553,
        lng: -3.6814,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 2000,
        precioM2: 22.5,
        metrosCuadrados: 89,
        fuente: "Bankinter",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Barrio jardín exclusivo - chalets y casas unifamiliares con jardines",
            "Zona muy tranquila y verde - calles arboladas y baja densidad",
            "Máximo prestigio social - una de las direcciones más exclusivas de Madrid",
            "Arquitectura singular - estilo racionalista y vanguardista",
            "Privacidad y seguridad - zona residencial cerrada en parte",
            "Ambiente familiar de élite - residentes de alto nivel adquisitivo",
            "Proximidad a colegios internacionales y embajadas",
            "Tranquilidad absoluta - tráfico mínimo y contaminación acústica baja"
        ],
        desventajas: [
            "Precio muy elevado - entre los más caros de Chamartín",
            "Metro algo alejado - Colombia (L8,L9) a 10-15 minutos andando",
            "Poco comercio de barrio - casi inexistente, todo orientado al automóvil",
            "Dependencia total del coche - servicios básicos lejanos",
            "Aislamiento relativo - vida social muy limitada dentro del barrio",
            "Falta de diversidad social - perfil socioeconómico muy homogéneo",
            "Servicios de proximidad nulos - necesidad de desplazamiento para compras"
        ]
    },
    {
        id: 32,
        nombre: "Prosperidad",
        distrito: "Chamartín",
        lat: 40.4503,
        lng: -3.6729,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1700,
        precioM2: 20.5,
        metrosCuadrados: 83,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Metro Prosperidad (L4) - conexión directa con centro en 15 minutos",
            "Zona comercial consolidada - Calles López de Hoyos y Arturo Soria",
            "Precio razonable para Chamartín - 15% más barato que El Viso",
            "Ambiente residencial familiar - mezcla generacional equilibrada",
            "Comercio variado - desde cadenas internacionales a tiendas locales",
            "Servicios completos - colegios, centros de salud, bancos, farmacias",
            "Buena comunicación - múltiples líneas de bus y acceso a M-30",
            "Arquitectura funcional - edificios bien mantenidos de los 70-80"
        ],
        desventajas: [
            "Edificios años 60-70 - necesidades de reforma en fachadas e instalaciones",
            "Menos prestigio que El Viso - considerado zona media de Chamartín",
            "Calles con mucho tráfico - López de Hoyos y Arturo Soria muy transitadas",
            "Poco espacio verde - solo pequeñas plazas interiores",
            "Densidad media-alta - mayor concentración que barrios exclusivos",
            "Proceso de gentrificación - precios en alza constante",
            "Falta de identidad propia - transición entre varios barrios"
        ]
    },
    {
        id: 33,
        nombre: "Ciudad Jardín",
        distrito: "Chamartín",
        lat: 40.4653,
        lng: -3.6686,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1850,
        precioM2: 21.0,
        metrosCuadrados: 88,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Zona residencial tranquila - calles amplias y poco tráfico",
            "Cercano a parques - Parque de Berlín y Paseo de la Castellana",
            "Buen equilibrio precio-calidad - mejor relación en Chamartín",
            "Ambiente familiar consolidado - residentes de larga trayectoria",
            "Arquitectura de calidad - edificios bien conservados con zonas verdes",
            "Seguridad y tranquilidad - baja criminalidad y ambiente sosegado",
            "Proximidad a colegios de prestigio - opciones públicas y privadas",
            "Comercio local suficiente - servicios básicos en radio cercano"
        ],
        desventajas: [
            "Metro algo lejos - Pío XII (L9) a 10-15 minutos andando",
            "Poco comercio local - limitado a necesidades básicas",
            "Lejos del centro de Madrid - 20-25 minutos en transporte",
            "Dependiente del bus - conexión principal por autobuses",
            "Falta de vida nocturna - ambiente estrictamente residencial",
            "Población envejecida - menor dinamismo juvenil",
            "Servicios culturales limitados - todo concentrado en ejes principales"
        ]
    },
    {
        id: 34,
        nombre: "Hispanoamérica",
        distrito: "Chamartín",
        lat: 40.4602,
        lng: -3.6782,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1900,
        precioM2: 21.5,
        metrosCuadrados: 88,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Plaza de Castilla cercana - principal intercambiador de transportes norte",
            "Buena conexión transporte: Metro Cuzco (L10), Santiago Bernabéu (L10)",
            "Zona moderna y renovada - edificios nuevos y rehabilitados",
            "Torres empresariales cerca - entorno corporativo de calidad",
            "Comercio variado en Calles Mateo Inurria y Agustín de Foxá",
            "Ambiente dinámico - mezcla de residencial y oficinas",
            "Acceso rápido a Castellana - conexión directa con centro financiero",
            "Servicios de calidad - clínicas privadas, restaurantes, gimnasios"
        ],
        desventajas: [
            "Mucho tráfico comercial - calles muy transitadas en horas laborables",
            "Zona muy corporativa - vacío los fines de semana y noches",
            "Precio en alza constante - gentrificación en proceso avanzado",
            "Poco ambiente residencial puro - convivencia con oficinas",
            "Aparcamiento complicado - alta rotación por actividad comercial",
            "Ruido de tráfico - proximidad a ejes principales muy transitados",
            "Falta de cohesión vecinal - población más flotante que otros barrios"
        ]
    },
    {
        id: 35,
        nombre: "Nueva España",
        distrito: "Chamartín",
        lat: 40.4674,
        lng: -3.6843,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1950,
        precioM2: 22.0,
        metrosCuadrados: 89,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Junto al Estadio Santiago Bernabéu - ambiente deportivo y vibrante",
            "Zona premium consolidada - una de las más valoradas de Chamartín",
            "Excelentes comunicaciones: Metro Cuzco (L10), Nuevos Ministerios (L6,L8,L10)",
            "Edificios modernos y de alta calidad - arquitectura contemporánea",
            "Comercio exclusivo en Calles Rafael Salgado y Juan Hurtado de Mendoza",
            "Proximidad a centros de negocios - entorno corporativo de élite",
            "Seguridad y vigilancia - zona bien cuidada y monitorizada",
            "Restaurantes de alta gama y servicios premium en radio cercano"
        ],
        desventajas: [
            "Precio alto - entre los más caros del distrito Chamartín",
            "Tráfico caótico días de partido - calles colapsadas regularmente",
            "Aparcamiento complicado - zona de máxima restricción y rotación",
            "Zona muy transitada - constante movimiento de vehículos y personas",
            "Ruido de eventos deportivos - ambiente alterado frecuentemente",
            "Población flotante - muchos residentes temporales por negocios",
            "Falta de intimidad - zona muy expuesta y visible"
        ]
    },
    {
        id: 36,
        nombre: "Castilla",
        distrito: "Chamartín",
        lat: 40.4719,
        lng: -3.6912,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1650,
        precioM2: 19.5,
        metrosCuadrados: 85,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Plaza de Castilla - principal intercambiador de transportes de Madrid norte",
            "Conexión excepcional: Metro Plaza de Castilla (L1,L9,L10), Cercanías, buses",
            "Precio más bajo de Chamartín - opción económica del distrito",
            "Torres Kio emblemáticas - símbolo arquitectónico de Madrid",
            "Acceso directo a N-1 y A-1 - conexión con norte de España",
            "Centros comerciales cercanos - ABC Serrano y El Corte Inglés",
            "Zona en proceso de renovación - nuevas promociones residenciales",
            "Vistas panorámicas - altura privilegiada sobre Madrid"
        ],
        desventajas: [
            "Ambiente muy corporativo - predominio de oficinas sobre residencial",
            "Poco carácter residencial - zona de tránsito más que de estancia",
            "Mucho tráfico constante - una de las rotondas más transitadas de Europa",
            "Ambiente de oficinas - vacío los fines de semana y noches",
            "Ruido y contaminación - tráfico intenso 24/7",
            "Falta de cohesión vecinal - población muy fluctuante",
            "Edificios de oficinas mezclados - menos calidad residencial pura"
        ]
    },

    // ========================================================================
    // DISTRITO 7: ARGANZUELA (7 barrios) - NUEVO FASE 2
    // ========================================================================
    {
        id: 37,
        nombre: "Imperial",
        distrito: "Arganzuela",
        lat: 40.3983,
        lng: -3.7129,
        zona: "Capital",
        subzona: "Sur-Centro",
        precioMedio: 1550,
        precioM2: 19.5,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Madrid Río a 5 minutos - acceso directo al parque fluvial",
            "Precio razonable para zona céntrica - 25% más barato que Centro",
            "Metro Acacias (L5) - conexión con centro en 10 minutos",
            "Zona en renovación - proceso de transformación urbana avanzado",
            "Comercio tradicional en Calles Antonio López y Ronda de Toledo",
            "Proximidad a Matadero Madrid - centro cultural de referencia",
            "Ambiente multicultural - mezcla de residentes y nuevos pobladores",
            "Fácil acceso a A-4 y M-30 - conexión rápida con sur y centro"
        ],
        desventajas: [
            "Edificios antiguos de los años 40-50 - necesidades de reforma",
            "Algo alejado del centro histórico - 15-20 minutos andando a Sol",
            "Pocas zonas comerciales consolidadas - comercio disperso",
            "En proceso de transformación - obras y cambios constantes",
            "Tráfico en Ronda de Toledo - eje muy transitado",
            "Falta de identidad definida - entre Centro y Arganzuela",
            "Servicios públicos limitados - dependencia de distritos colindantes"
        ]
    },
    {
        id: 38,
        nombre: "Acacias",
        distrito: "Arganzuela",
        lat: 40.3991,
        lng: -3.7058,
        zona: "Capital",
        subzona: "Sur-Centro",
        precioMedio: 1600,
        precioM2: 20.0,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Metro Acacias (L5) - conexión excelente con centro y sur",
            "Cerca de Embajadores - ambiente multicultural y alternativo",
            "Zona multicultural - diversidad de nacionalidades y culturas",
            "Precio competitivo - opción económica cerca del centro",
            "Comercio étnico variado - productos internacionales y tiendas especializadas",
            "Proximidad a Madrid Río - acceso rápido a zonas verdes",
            "Proceso de revitalización - nuevos residentes jóvenes y creativos",
            "Arquitectura tradicional madrileña - corralas y patios castizos"
        ],
        desventajas: [
            "Edificios envejecidos - necesidades de mantenimiento y reforma",
            "Poco comercio moderno - predominio de pequeño comercio tradicional",
            "Calles estrechas - difícil acceso vehicular en algunas zonas",
            "Parking muy difícil - alta densidad y calles angostas",
            "Problemas de limpieza en algunas calles secundarias",
            "Presión de gentrificación - precios en alza constante",
            "Falta de servicios especializados - todo muy básico y local"
        ]
    },
    {
        id: 39,
        nombre: "Chopera",
        distrito: "Arganzuela",
        lat: 40.4009,
        lng: -3.6991,
        zona: "Capital",
        subzona: "Sur-Centro",
        precioMedio: 1700,
        precioM2: 21.2,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Parque Enrique Tierno Galván - amplia zona verde con planetario",
            "Planetario de Madrid - centro astronómico y actividades culturales",
            "Madrid Río accesible - conexión directa con parque fluvial",
            "Zona en transformación - nuevas promociones y rehabilitaciones",
            "Proximidad a Matadero Madrid - epicentro cultural del sur",
            "Arquitectura moderna - edificios nuevos y bien equipados",
            "Ambiente emergente - nuevos proyectos culturales y gastronómicos",
            "Fácil acceso a M-30 - conexión rápida con toda la ciudad"
        ],
        desventajas: [
            "Metro algo alejado - Delicias (L3) a 10-15 minutos andando",
            "Tráfico de M-30 cercano - ruido y contaminación en límites",
            "Obras en la zona - transformación urbana en proceso",
            "Poco consolidado aún - falta de servicios establecidos",
            "Precios en alza rápida - gentrificación acelerada",
            "Falta de comercio local - pocas opciones de proximidad",
            "Aislamiento relativo - entre vías rápidas y zonas industriales"
        ]
    },
    {
        id: 40,
        nombre: "Legazpi",
        distrito: "Arganzuela",
        lat: 40.3924,
        lng: -3.6934,
        zona: "Capital",
        subzona: "Sur",
        precioMedio: 1650,
        precioM2: 20.5,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Metro Legazpi (L3,L6) - intercambiador importante del sur",
            "Matadero Madrid - centro cultural de referencia nacional",
            "Madrid Río espectacular - tramo mejor conservado del parque",
            "Zona muy bien comunicada - conexión con toda la ciudad",
            "Archivo Regional - instalaciones culturales y de investigación",
            "Proceso de transformación - de industrial a cultural-residencial",
            "Precio competitivo - opción con potencial de revalorización",
            "Espacios amplios - naves reconvertidas y nuevos desarrollos"
        ],
        desventajas: [
            "Zona industrial histórica - herencia fabrica aún visible",
            "Edificios antiguos industriales - necesidades de adaptación",
            "Algo alejado del centro - 20-25 minutos en transporte",
            "En proceso de gentrificación - cambios sociales en curso",
            "Tráfico de mercancías residual - actividad logística persistente",
            "Falta de cohesión vecinal - población muy mezclada y cambiante",
            "Servicios básicos limitados - en desarrollo pero aún insuficientes"
        ]
    },
    {
        id: 41,
        nombre: "Delicias",
        distrito: "Arganzuela",
        lat: 40.3953,
        lng: -3.6869,
        zona: "Capital",
        subzona: "Sur-Centro",
        precioMedio: 1620,
        precioM2: 20.2,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Museo del Ferrocarril - patrimonio industrial único en antigua estación",
            "Cerca de Atocha - conexión con estación principal de trenes",
            "Buena conexión transporte: Metro Delicias (L3) y múltiples líneas de bus",
            "Precio razonable para zona céntrica - 20% más barato que Centro",
            "Arquitectura industrial rehabilitada - naves convertidas en viviendas",
            "Proximidad a Matadero Madrid - oferta cultural de calidad",
            "Ambiente tranquilo - calles residenciales poco transitadas",
            "Proceso de revitalización - nueva población joven y creativa"
        ],
        desventajas: [
            "Edificios envejecidos de los años 50-60 - necesidades de reforma",
            "Zona algo ruidosa - tráfico de mercancías y actividad ferroviaria residual",
            "Tráfico ferroviario cercano - vías de tren activas en límites del barrio",
            "Pocas zonas verdes - dependencia de Madrid Río y parques exteriores",
            "Comercio limitado - pocas opciones de calidad y especializadas",
            "Falta de identidad definida - entre industrial y residencial",
            "Servicios públicos básicos - dependencia de distritos colindantes"
        ]
    },
    {
        id: 42,
        nombre: "Palos de Moguer",
        distrito: "Arganzuela",
        lat: 40.3887,
        lng: -3.6799,
        zona: "Capital",
        subzona: "Sur",
        precioMedio: 1580,
        precioM2: 19.8,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio más bajo de Arganzuela - opción más económica del distrito",
            "Metro Palos de la Frontera (L3) - conexión directa con centro",
            "Zona residencial tranquila - calles poco transitadas y ambiente sosegado",
            "Comercio de barrio tradicional - precios asequibles y trato personal",
            "Proximidad a Madrid Río - acceso a zonas verdes en 10 minutos",
            "Ambiente auténtico - población residente de larga trayectoria",
            "Fácil aparcamiento - menor densidad vehicular que zonas céntricas",
            "Proceso de mejora lento pero constante - pequeñas rehabilitaciones"
        ],
        desventajas: [
            "Lejos del centro histórico - 25-30 minutos andando a puntos centrales",
            "Edificios años 60-70 con necesidades de mantenimiento",
            "Poco atractivo urbano - arquitectura repetitiva y espacios públicos básicos",
            "Servicios básicos - falta de opciones culturales y de ocio",
            "Comercio muy tradicional - pocas opciones modernas o especializadas",
            "Falta de dinamismo - población envejecida y menor actividad juvenil",
            "Imagen de barrio obrero - aunque en proceso de transformación"
        ]
    },
    {
        id: 43,
        nombre: "Atocha",
        distrito: "Arganzuela",
        lat: 40.4073,
        lng: -3.6918,
        zona: "Capital",
        subzona: "Centro-Sur",
        precioMedio: 1750,
        precioM2: 21.8,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Estación de Atocha - principal intercambiador de transportes de España",
            "Excelente conexión nacional e internacional - trenes AVE y larga distancia",
            "Cerca del Retiro y Museo Reina Sofía - oferta cultural y verde excepcional",
            "Zona céntrica privilegiada - a 15 minutos andando de Sol",
            "Metro Atocha (L1) y Atocha Renfe (L1) - conexión metropolitana excelente",
            "Jardín tropical de Atocha - espacio único dentro de la estación",
            "Proximidad a instituciones: Ministerio de Agricultura y otras sedes",
            "Proceso de renovación - nuevas promociones residenciales de calidad"
        ],
        desventajas: [
            "Muy turístico - constante flujo de visitantes y viajeros",
            "Tráfico constante en Calles Atocha y Méndez Álvaro - congestión permanente",
            "Ruido de trenes y actividades ferroviarias - actividad 24/7",
            "Precio en alza constante - gentrificación en proceso acelerado",
            "Falta de intimidad - zona muy transitada y expuesta",
            "Comercio orientado al turismo - pocas opciones para residentes",
            "Problemas de limpieza - alta rotación de personas y acumulación residuos"
        ]
    },

    // ========================================================================
    // DISTRITO 8: TETUÁN (6 barrios) - NUEVO FASE 2
    // ========================================================================
    {
        id: 44,
        nombre: "Bellas Vistas",
        distrito: "Tetuán",
        lat: 40.4517,
        lng: -3.7054,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1620,
        precioM2: 20.2,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Metro Estrecho (L1) - conexión directa con centro en 12 minutos",
            "Precio accesible para zona norte - 25% más barato que Chamberí",
            "Zona comercial activa en Calles Bravo Murillo y General Margallo",
            "Bien comunicado: múltiples líneas de bus y acceso a M-30",
            "Comercio variado y económico - opciones para todos los presupuestos",
            "Ambiente multicultural - diversidad de nacionalidades y culturas",
            "Arquitectura tradicional madrileña - edificios con carácter histórico",
            "Proceso de revitalización - nueva población joven y familias"
        ],
        desventajas: [
            "Densidad alta - edificios con muchas viviendas y espacios reducidos",
            "Edificios antiguos de los años 40-50 - necesidades de reforma",
            "Calles con tráfico constante - ejes principales muy transitados",
            "Pocas zonas verdes - solo pequeñas plazas interiores",
            "Ruido comercial - actividad constante en calles principales",
            "Falta de espacios públicos de calidad - plazas pequeñas y funcionales",
            "Presión de gentrificación - precios en alza aunque aún asequibles"
        ]
    },
    {
        id: 45,
        nombre: "Cuatro Caminos",
        distrito: "Tetuán",
        lat: 40.4489,
        lng: -3.7021,
        zona: "Capital",
        subzona: "Norte-Centro",
        precioMedio: 1700,
        precioM2: 21.2,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Intercambiador Cuatro Caminos (L1,L2,L6) - conexión excepcional norte",
            "Conexión excepcional con toda la ciudad - nudo de transportes histórico",
            "Comercio variado en Calles Bravo Murillo y Santa Engracia - todo tipo de opciones",
            "Zona consolidada y con todos los servicios - madurez urbana completa",
            "Arquitectura emblemática - edificios históricos bien conservados",
            "Ambiente vibrante - mezcla de comercial, residencial y de oficinas",
            "Proximidad a Chamberí y Centro - ubicación estratégica norte-centro",
            "Servicios completos: colegios, centros de salud, bancos, farmacias"
        ],
        desventajas: [
            "Muy transitado - una de las zonas con más movimiento de Madrid",
            "Mucho tráfico constante - rotonda histórica muy congestionada",
            "Ruido constante - actividad comercial y vehicular 24/7",
            "Poco espacio verde - ausencia total de parques o plazas grandes",
            "Aparcamiento imposible - zona de máxima rotación y restricción",
            "Falta de tranquilidad - imposible silencio o intimidad urbana",
            "Precios en alza constante - presión de ubicación céntrica"
        ]
    },
    {
        id: 46,
        nombre: "Castillejos",
        distrito: "Tetuán",
        lat: 40.4554,
        lng: -3.6992,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1650,
        precioM2: 20.6,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Metro Alvarado (L1) - conexión directa con centro en 10 minutos",
            "Precio razonable para zona bien comunicada - equilibrio calidad-precio",
            "Barrio familiar consolidado - residentes de larga trayectoria",
            "Comercio de proximidad en Calles General Perón y Marqués de Viana",
            "Ambiente tranquilo en calles interiores - alejado de ejes principales",
            "Arquitectura de los años 50-60 bien mantenida - edificios sólidos",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Proceso de mejora continua - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Edificios envejecidos - necesidades de reforma en fachadas e instalaciones",
            "Poco atractivo urbanístico - arquitectura funcional sin especial interés",
            "Calles estrechas en zona interior - difícil acceso y aparcamiento",
            "Parking complicado - alta densidad residencial y pocas plazas",
            "Falta de espacios verdes - solo plazas duras pequeñas",
            "Comercio básico - pocas opciones de calidad o especializadas",
            "Población envejecida - menor dinamismo que otros barrios"
        ]
    },
    {
        id: 47,
        nombre: "Almenara",
        distrito: "Tetuán",
        lat: 40.4629,
        lng: -3.6965,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1580,
        precioM2: 19.7,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio más bajo de Tetuán - opción más económica del distrito",
            "Zona residencial tranquila - calles poco transitadas y ambiente sosegado",
            "Parque de la Ventilla - amplia zona verde con áreas deportivas y infantiles",
            "Ambiente familiar - preferido por familias con niños",
            "Comercio local económico - precios asequibles en alimentación y servicios",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Proceso de mejora urbana - renovación de espacios públicos",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias"
        ],
        desventajas: [
            "Metro algo alejado - Tetuán (L1) a 10-15 minutos andando",
            "Lejos del centro de Madrid - 25-30 minutos en transporte público",
            "Servicios básicos - falta de opciones culturales y de ocio",
            "Edificios años 70 - arquitectura repetitiva y poco atractiva",
            "Falta de dinamismo comercial - comercio muy local y básico",
            "Aislamiento relativo - percepción de barrio periférico aunque dentro capital",
            "Menor prestigio que otros barrios de Tetuán - considerado zona humilde"
        ]
    },
    {
        id: 48,
        nombre: "Valdeacederas",
        distrito: "Tetuán",
        lat: 40.4682,
        lng: -3.7008,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1550,
        precioM2: 19.3,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Más barato del distrito - opción más económica de Tetuán",
            "Metro Valdeacederas (L1) - conexión directa con centro",
            "Zona en renovación - proceso de transformación urbana avanzado",
            "Nuevos espacios verdes - mejora de plazas y áreas recreativas",
            "Comercio muy económico - precios asequibles para todos los bolsillos",
            "Ambiente auténtico - población residente de toda la vida",
            "Fácil aparcamiento - menor densidad vehicular que centro",
            "Proyectos de rehabilitación - mejora de edificios y espacios públicos"
        ],
        desventajas: [
            "Históricamente degradado - estigma social persistente",
            "Lejos del centro de Madrid - 30-35 minutos en transporte público",
            "En proceso de transformación - obras y cambios constantes",
            "Servicios mejorando pero aún limitados - en desarrollo",
            "Edificios de los años 60-70 con carencias - necesidades de reforma",
            "Falta de opciones de ocio y cultura - todo muy básico",
            "Imagen de barrio obrero - aunque en claro proceso de mejora"
        ]
    },
    {
        id: 49,
        nombre: "Berruguete",
        distrito: "Tetuán",
        lat: 40.4634,
        lng: -3.7084,
        zona: "Capital",
        subzona: "Norte",
        precioMedio: 1600,
        precioM2: 20.0,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Metro Francos Rodríguez (L7) - conexión con norte y centro",
            "Precio competitivo - buena relación calidad-precio en Tetuán",
            "Barrio auténtico - esencia de Tetuán tradicional",
            "Comercio local activo en Calles Sinesio Delgado y Francos Rodríguez",
            "Ambiente residencial consolidado - población de larga trayectoria",
            "Arquitectura funcional bien mantenida - edificios sólidos de los 70",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Proceso de mejora continua - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Edificios antiguos - necesidades de reforma en instalaciones",
            "Pocas zonas verdes - dependencia de parques exteriores",
            "Algo alejado del centro - 25-30 minutos en transporte público",
            "Densidad alta - edificios con muchas viviendas y espacios reducidos",
            "Comercio básico - pocas opciones de calidad o especializadas",
            "Falta de dinamismo - población estable pero poco juvenil",
            "Tráfico en ejes principales - calles comerciales congestionadas"
        ]
    },

    // ========================================================================
    // DISTRITO 9: CIUDAD LINEAL (9 barrios) - NUEVO FASE 2
    // ========================================================================
    {
        id: 50,
        nombre: "Ventas",
        distrito: "Ciudad Lineal",
        lat: 40.4307,
        lng: -3.6612,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1400,
        precioM2: 17.5,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Plaza de Toros de Las Ventas - monumento emblemático y eventos culturales",
            "Metro Ventas (L2,L5) - conexión excelente con centro y este",
            "Zona comercial activa en Calles Alcalá y Goya - todo tipo de tiendas",
            "Buen precio-calidad - equilibrio entre ubicación y coste",
            "Ambiente castizo - esencia madrileña tradicional",
            "Comercio variado - desde grandes cadenas a tiendas locales",
            "Proximidad a Salamanca - lujo cercano a precios más asequibles",
            "Eventos culturales - programación constante en plaza de toros"
        ],
        desventajas: [
            "Tráfico caótico días de toros - calles colapsadas en temporada taurina",
            "Edificios años 60-70 - necesidades de reforma y modernización",
            "Lejos del centro histórico - 20-25 minutos andando a puntos centrales",
            "Poco espacio verde - solo pequeñas plazas interiores",
            "Ruido de eventos - alteración del tráfico y tranquilidad vecinal",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Presión turística temporal - masificación en eventos específicos"
        ]
    },
    {
        id: 51,
        nombre: "Pueblo Nuevo",
        distrito: "Ciudad Lineal",
        lat: 40.4361,
        lng: -3.6538,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1380,
        precioM2: 17.2,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Metro El Carmen (L5) - conexión directa con centro en 15 minutos",
            "Precio asequible - una de las opciones más económicas del este",
            "Zona residencial familiar - ambiente tranquilo y seguro",
            "Comercio de barrio tradicional - precios económicos y trato personal",
            "Mercado de Pueblo Nuevo - productos frescos y comercio local",
            "Ambiente auténtico - población residente de larga trayectoria",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Proceso de mejora lento - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Lejos del centro de Madrid - 30-35 minutos en transporte público",
            "Edificios envejecidos de los años 60-70 - necesidades de mantenimiento",
            "Pocas opciones de ocio y cultura - limitado a comercio básico",
            "Metro algo lejos para algunas calles - dependencia del autobús",
            "Falta de atractivo urbanístico - arquitectura repetitiva y funcional",
            "Comercio muy local - pocas opciones de calidad o especializadas",
            "Población envejecida - menor dinamismo que otros barrios"
        ]
    },
    {
        id: 52,
        nombre: "Quintana",
        distrito: "Ciudad Lineal",
        lat: 40.4408,
        lng: -3.6473,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1350,
        precioM2: 16.8,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Precio económico - opción más asequible de Ciudad Lineal",
            "Metro Quintana (L5) - conexión directa con centro",
            "Zona tranquila y residencial - calles poco transitadas",
            "Ambiente familiar consolidado - preferido por familias con niños",
            "Comercio local económico - precios asequibles en alimentación y servicios",
            "Fácil aparcamiento - menor densidad vehicular que zonas céntricas",
            "Servicios básicos completos - colegios, centros de salud, farmacias",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias"
        ],
        desventajas: [
           "Muy alejado del centro - 35-40 minutos en transporte público",
            "Edificios años 70 - arquitectura repetitiva y poco atractiva",
            "Servicios básicos - falta de opciones culturales y de ocio",
            "Poco atractivo urbanístico - espacios públicos funcionales",
            "Comercio muy local - pocas opciones de calidad o especializadas",
            "Falta de dinamismo - población estable pero poco juvenil",
            "Aislamiento relativo - percepción de barrio periférico"
        ]
    },
    {
        id: 53,
        nombre: "Concepción",
        distrito: "Ciudad Lineal",
        lat: 40.4281,
        lng: -3.6498,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1420,
        precioM2: 17.7,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Metro Ciudad Lineal (L5) - conexión excelente con centro y este",
            "Bien comunicado - múltiples líneas de bus y acceso a M-30",
            "Precio razonable - equilibrio entre ubicación y coste",
            "Comercio variado en Avenida de la Institución Libre de Enseñanza",
            "Ambiente residencial consolidado - mezcla generacional equilibrada",
            "Servicios completos: colegios, centros de salud, bancos, farmacias",
            "Arquitectura funcional bien mantenida - edificios de los 70-80",
            "Proceso de mejora continua - rehabilitaciones y mejoras urbanas"
        ],
        desventajas: [
            "Edificios antiguos - necesidades de reforma en fachadas e instalaciones",
            "Lejos del centro histórico - 25-30 minutos en transporte público",
            "Calles con tráfico constante - ejes principales muy transitados",
            "Pocas zonas verdes - solo pequeñas plazas interiores",
            "Comercio convencional - pocas opciones alternativas o modernas",
            "Falta de identidad propia - transición entre varios barrios",
            "Presión de gentrificación - precios en alza aunque aún asequibles"
        ]
    },
    {
        id: 54,
        nombre: "San Pascual",
        distrito: "Ciudad Lineal",
        lat: 40.4456,
        lng: -3.6409,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1360,
        precioM2: 17.0,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Precio económico para zona este - 35% más barato que media Madrid",
            "Metro San Pascual (L5) - conexión directa con centro en 20 minutos",
            "Zona residencial tranquila con calles poco transitadas",
            "Ambiente familiar consolidado - población residente de larga trayectoria",
            "Comercio local económico en Calle Alcalá y Avenida de Daroca",
            "Proximidad a centros educativos públicos bien valorados",
            "Fácil aparcamiento - menor densidad vehicular que zonas céntricas",
            "Proceso de mejora urbana constante - rehabilitaciones en curso"
        ],
        desventajas: [
            "Muy lejos del centro histórico - 35-40 minutos en transporte público",
            "Edificios de los años 60-70 con necesidades de modernización",
            "Comercio limitado a necesidades básicas - pocas opciones de ocio",
            "Servicios públicos limitados - centros de salud y culturales saturados",
            "Falta de dinamismo juvenil - población mayoritariamente estable y senior",
            "Transporte público menos frecuente que en zonas céntricas",
            "Aislamiento relativo - percepción de barrio periférico aunque dentro capital"
        ]
    },
    {
        id: 55,
        nombre: "San Juan Bautista",
        distrito: "Ciudad Lineal",
        lat: 40.4389,
        lng: -3.6361,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1390,
        precioM2: 17.3,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio competitivo para zona bien comunicada - equilibrio calidad-precio",
            "Parque Juan Carlos I a 15 minutos - mayor zona verde del este de Madrid",
            "Zona familiar preferida por jóvenes familias - colegios y parques infantiles",
            "Metro Torre Arias (L5) - conexión directa con centro y ferias IFEMA",
            "Comercio local en Calles Hermanos García Noblejas y Arcos de Jalón",
            "Ambiente tranquilo y seguro - baja criminalidad y tráfico reducido",
            "Proceso de renovación urbana - mejoras en espacios públicos y fachadas",
            "Servicios básicos completos - farmacias, supermercados, centros de salud"
        ],
        desventajas: [
            "Alejado del centro de Madrid - 30-35 minutos en transporte público",
            "Metro algo lejos para algunas calles - dependencia del autobús en zonas interiores",
            "Edificios monótonos de los años 70 - arquitectura repetitiva sin carácter",
            "Poco ambiente nocturno y de ocio - todo muy familiar y tranquilo",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Falta de identidad propia - transición entre varios barrios de Ciudad Lineal",
            "Transporte público menos denso que en zonas céntricas - esperas más largas"
        ]
    },
    {
        id: 56,
        nombre: "Colina",
        distrito: "Ciudad Lineal",
        lat: 40.4514,
        lng: -3.6346,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1340,
        precioM2: 16.7,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Uno de los barrios más baratos de Ciudad Lineal - opción económica",
            "Zona tranquila y residencial - calles con poco tráfico y ruido",
            "Ambiente familiar consolidado - preferido por familias con niños",
            "Espacios verdes en calles interiores - pequeñas plazas arboladas",
            "Comercio local muy económico - precios asequibles en alimentación",
            "Fácil aparcamiento - una de las zonas con menor presión vehicular",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias",
            "Proceso de mejora continua - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Zona muy periférica - límite este de Madrid capital",
            "Metro alejado - Suanzes (L5) a 15-20 minutos andando",
            "Pocas opciones culturales y de ocio - limitado a comercio básico",
            "Dependiente del autobús - conexión principal por líneas de bus",
            "Edificios de los años 60-70 con carencias - necesidades de reforma",
            "Servicios públicos limitados - todo concentrado en ejes principales",
            "Aislamiento geográfico - percepción de barrio desconectado del centro"
        ]
    },
    {
        id: 57,
        nombre: "Atalaya",
        distrito: "Ciudad Lineal",
        lat: 40.4569,
        lng: -3.6283,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1330,
        precioM2: 16.6,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio muy económico - entre los más asequibles de Madrid capital",
            "Zona residencial pura - sin comercio invasivo ni tráfico pesado",
            "Tranquilo y seguro - una de las zonas con menor criminalidad",
            "Parques cercanos como Quinta de los Molinos a 20 minutos andando",
            "Ambiente auténtico de barrio - población residente de toda la vida",
            "Fácil aparcamiento - calles amplias con baja ocupación vehicular",
            "Comercio básico económico - precios muy competitivos en productos",
            "Proceso de revitalización lento pero constante - mejoras puntuales"
        ],
        desventajas: [
            "Muy alejado del centro - 40-45 minutos en transporte público",
            "Sin metro cercano - dependencia total de autobuses urbanos",
            "Servicios básicos limitados - farmacias y centros de salud escasos",
            "Poco comercio y opciones de ocio - todo muy local y básico",
            "Edificios de promoción pública años 70 - arquitectura repetitiva",
            "Falta de dinamismo - población envejecida y menor actividad juvenil",
            "Aislamiento total - percepción de barrio fuera de Madrid capital"
        ]
    },
    {
        id: 58,
        nombre: "Costillares",
        distrito: "Ciudad Lineal",
        lat: 40.4621,
        lng: -3.6218,
        zona: "Capital",
        subzona: "Este",
        precioMedio: 1320,
        precioM2: 16.5,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Más barato de Ciudad Lineal - precio imbatible dentro del distrito",
            "Zona muy tranquila - casi rural dentro de la capital",
            "Residencial puro sin contaminación acústica o comercial",
            "Aire de barrio tradicional - esencia de Madrid antiguo",
            "Espacios abiertos y calles amplias - sensación de amplitud",
            "Fácil aparcamiento absoluto - nunca problemas de estacionamiento",
            "Comunidad muy unida - vecinos de décadas de convivencia",
            "Precios de compra muy competitivos - oportunidad de inversión"
        ],
        desventajas: [
            "Extremadamente alejado del centro - 45-50 minutos en transporte",
            "Sin metro y con autobuses poco frecuentes - aislamiento real",
            "Dependiente del coche para vida normal - necesidad de vehículo",
            "Servicios limitados al extremo - solo lo más básico disponible",
            "Comercio casi inexistente - tiendas de ultramarinos básicas",
            "Falta total de opciones de ocio y cultura - desierto de actividades",
            "Población muy envejecida - falta de rejuvenecimiento generacional"
        ]
    },

    // ========================================================================
    // DISTRITO 10: HORTALEZA (7 barrios) - NUEVO FASE 2
    // ========================================================================
    {
        id: 59,
        nombre: "Palomas",
        distrito: "Hortaleza",
        lat: 40.4673,
        lng: -3.6532,
        zona: "Capital",
        subzona: "Norte-Este",
        precioMedio: 1320,
        precioM2: 16.5,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Precio económico para zona norte - 35% más barato que Chamartín",
            "Zona residencial tranquila con calles arboladas y poco tráfico",
            "Parque de la Huerta del Obispo - amplia zona verde con áreas deportivas",
            "Ambiente familiar consolidado - preferido por familias jóvenes",
            "Comercio local en Calles Silvano y Palomas - precios asequibles",
            "Fácil aparcamiento - menor densidad vehicular que zonas céntricas",
            "Proceso de mejora urbana - rehabilitación de fachadas y espacios",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias"
        ],
        desventajas: [
            "Lejos del centro de Madrid - 30-35 minutos en transporte público",
            "Metro alejado - Pío XII (L9) a 15-20 minutos andando",
            "Servicios básicos - falta de opciones culturales y de ocio",
            "Poco comercio especializado - todo muy local y convencional",
            "Edificios de los años 70-80 - arquitectura funcional sin carácter",
            "Falta de dinamismo comercial - comercio orientado a necesidades básicas",
            "Transporte público menos frecuente - dependencia de autobuses"
        ]
    },
    {
        id: 60,
        nombre: "Valdefuentes",
        distrito: "Hortaleza",
        lat: 40.4847,
        lng: -3.6378,
        zona: "Capital",
        subzona: "Norte-Este",
        precioMedio: 1400,
        precioM2: 17.5,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Zona nueva en expansión - PAU de Valdefuentes en desarrollo activo",
            "Construcciones modernas y eficientes energéticamente",
            "Precio competitivo para vivienda nueva - buena relación calidad-precio",
            "Zonas verdes amplias y bien diseñadas - parques integrados en urbanización",
            "Instalaciones deportivas nuevas - pistas y gimnasios al aire libre",
            "Colegios públicos de reciente construcción - instalaciones modernas",
            "Planificación urbana cuidadosa - calles amplias y bien distribuidas",
            "Potencial de revalorización - zona en claro proceso de apreciación"
        ],
        desventajas: [
            "Muy alejado del centro de Madrid - 40-45 minutos en transporte",
            "Sin metro operativo - dependencia total de autobuses y coche",
            "En desarrollo - obras constantes y servicios aún por consolidar",
            "Servicios en construcción - comercios y centros aún por abrir",
            "Población aún escasa - falta de vida comunitaria consolidada",
            "Transporte público limitado - frecuencias bajas en horarios no punta",
            "Falta de identidad de barrio - todo muy nuevo y sin historia"
        ]
    },
    {
        id: 61,
        nombre: "Canillas",
        distrito: "Hortaleza",
        lat: 40.4729,
        lng: -3.6471,
        zona: "Capital",
        subzona: "Norte-Este",
        precioMedio: 1340,
        precioM2: 16.7,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Metro Canillas (L4) - conexión directa con centro en 18 minutos",
            "Precio asequible para zona bien comunicada - equilibrio ideal",
            "Zona tranquila pero bien conectada - lo mejor de ambos mundos",
            "Comercio de barrio tradicional en Avenida de Canillas",
            "Ambiente familiar consolidado - mezcla generacional equilibrada",
            "Servicios completos: colegios, centros de salud, bancos, farmacias",
            "Fácil acceso a M-30 y M-40 - conexión rápida con toda la ciudad",
            "Proceso de renovación constante - mejoras en edificios y espacios"
        ],
        desventajas: [
            "Lejos del centro histórico - 25-30 minutos en transporte público",
            "Edificios años 70 con necesidades de modernización",
            "Poco atractivo urbanístico - arquitectura funcional sin especial interés",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Tráfico en Avenida de Canillas - eje principal congestionado en horas punta",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Falta de espacios verdes propios - dependencia de parques exteriores"
        ]
    },
    {
        id: 62,
        nombre: "Pinar del Rey",
        distrito: "Hortaleza",
        lat: 40.4781,
        lng: -3.6409,
        zona: "Capital",
        subzona: "Norte-Este",
        precioMedio: 1360,
        precioM2: 17.0,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Metro Mar de Cristal (L8) - conexión directa con centro y aeropuerto",
            "Zona residencial moderna bien planificada - calles amplias y ordenadas",
            "Precio razonable para vivienda de calidad - buena inversión",
            "Bien planificado urbanísticamente - espacios verdes integrados",
            "Comercio moderno en Calles Panamá y Ecuador - opciones actuales",
            "Ambiente familiar joven - población de reciente instalación",
            "Instalaciones deportivas y recreativas - áreas para todas las edades",
            "Seguridad y tranquilidad - zona bien vigilada y cuidada"
        ],
        desventajas: [
            "Alejado del centro de Madrid - 30-35 minutos en transporte público",
            "Zona dormitorio - poco ambiente comercial y de ocio nocturno",
            "Poco ambiente nocturno - todo muy residencial y tranquilo",
            "Dependiente del transporte - necesidad de metro/coche para moverse",
            "Comercio básico - pocas opciones de restauración y ocio",
            "Falta de historia y carácter - todo muy nuevo y estandarizado",
            "Precios en alza constante - gentrificación en proceso"
        ]
    },
    {
        id: 63,
        nombre: "Apóstol Santiago",
        distrito: "Hortaleza",
        lat: 40.4612,
        lng: -3.6412,
        zona: "Capital",
        subzona: "Norte-Este",
        precioMedio: 1330,
        precioM2: 16.6,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Precio económico para zona con metro - opción inteligente",
            "Metro Parque de Santa María (L4) - conexión excelente con centro",
            "Zona tranquila y residencial - calles poco transitadas",
            "Ambiente familiar consolidado - preferido por familias estables",
            "Comercio local en Calles Apóstol Santiago y Mar Báltico",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Proceso de mejora continua - rehabilitaciones y mejoras urbanas"
        ],
        desventajas: [
            "Lejos del centro de Madrid - 25-30 minutos en transporte público",
            "Edificios años 80 con necesidades de actualización",
            "Servicios limitados a lo básico - falta de opciones culturales",
            "Poco comercio grande - ausencia de grandes superficies cercanas",
            "Falta de dinamismo comercial - comercio muy local y tradicional",
            "Transporte público menos denso - esperas más largas que en centro",
            "Población envejecida - menor actividad juvenil que otros barrios"
        ]
    },
    {
        id: 64,
        nombre: "Piovera",
        distrito: "Hortaleza",
        lat: 40.4678,
        lng: -3.6348,
        zona: "Capital",
        subzona: "Norte-Este",
        precioMedio: 1350,
        precioM2: 16.8,
        metrosCuadrados: 80,
        fuente: "Fotocasa",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Precio competitivo para zona en desarrollo - buena oportunidad",
            "Zona residencial nueva con planificación urbanística moderna",
            "Parques y zonas verdes integradas en el diseño urbano",
            "Ambiente familiar joven - población de reciente instalación",
            "Calles amplias y bien diseñadas - fácil circulación y aparcamiento",
            "Potencial de revalorización - zona en claro proceso de mejora",
            "Comunidad emergente - nuevos vecinos con proyectos comunes",
            "Proximidad a centros comerciales - Heron City a 10 minutos"
        ],
        desventajas: [
            "Metro algo alejado - Mar de Cristal (L8) a 15-20 minutos andando",
            "Lejos del centro de Madrid - 35-40 minutos en transporte público",
            "Servicios en desarrollo - algunos equipamientos aún por llegar",
            "Poco consolidado - falta de historia y tradición de barrio",
            "Comercio limitado - pocas opciones establecidas aún",
            "Transporte público en desarrollo - frecuencias mejorables",
            "Falta de identidad propia - barrio muy nuevo sin carácter definido"
        ]
    },
    {
        id: 65,
        nombre: "Cañaveral",
        distrito: "Hortaleza",
        lat: 40.4893,
        lng: -3.6156,
        zona: "Capital",
        subzona: "Norte-Este",
        precioMedio: 1280,
        precioM2: 16.0,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Febrero 2025",
        ventajas: [
            "Más barato de Hortaleza - precio imbatible en el distrito",
            "Zona nueva PAU (Plan de Actuación Urbanística) - todo por estrenar",
            "Construcciones modernas con máxima eficiencia energética",
            "Precio muy competitivo para vivienda nueva - oportunidad única",
            "Diseño urbanístico contemporáneo - calles amplias y espacios verdes",
            "Potencial máximo de revalorización - zona en inicio de desarrollo",
            "Comunidad de nuevos residentes - oportunidad de crear identidad",
            "Viviendas con mejores acabados - normativas de construcción actuales"
        ],
        desventajas: [
            "Extremadamente alejado del centro - 45-50 minutos en transporte",
            "Sin metro operativo (en proyecto) - dependencia total de autobuses",
            "Aún en desarrollo - obras constantes y servicios incompletos",
            "Servicios limitados al extremo - lo básico aún por implementar",
            "Población muy escasa - falta de vida comunitaria y comercio",
            "Transporte público muy limitado - frecuencias escasas y horarios",
            "Aislamiento total - percepción de vivir fuera de Madrid realmente"
        ]
    },

    // ========================================================================
    // ÁREA METROPOLITANA - ZONA OESTE (PREMIUM)
    // ========================================================================
    {
        id: 66,
        nombre: "Pozuelo de Alarcón",
        lat: 40.4353,
        lng: -3.8124,
        zona: "Periferia",
        subzona: "Oeste",
        precioMedio: 2484,
        precioM2: 17.6,
        metrosCuadrados: 141,
        fuente: "Properfy",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Zona premium de alto poder adquisitivo - una de las más exclusivas de España",
            "Colegios internacionales prestigiosos: Kensington School, British Council, Liceo Europeo",
            "Casas unifamiliares y chalets con jardines privados - arquitectura de calidad",
            "Muy seguro y residencial - una de las tasas de criminalidad más bajas del país",
            "Centro comercial Zoco Pozuelo - oferta comercial de alta gama",
            "Excelentes conexiones: Cercanías C7, C8, C10 y múltiples líneas de autobús",
            "Entorno natural privilegiado - Monte del Pilar y Casa de Campo cercanos",
            "Servicios municipales de primera calidad - instalaciones deportivas y culturales"
        ],
        desventajas: [
            "Precio muy elevado - entre los municipios más caros de toda España",
            "Dependiente del coche para movilidad interna - distancias largas dentro del municipio",
            "Lejos del centro de Madrid - 25-30 minutos en transporte en condiciones óptimas",
            "Metro limitado - sin conexión directa de metro, solo Cercanías",
            "Vida nocturna casi inexistente - ambiente estrictamente residencial y familiar",
            "Tráfico en A-6 y M-500 - congestiones frecuentes en horas punta",
            "Falta de diversidad social - perfil socioeconómico muy homogéneo y alto"
        ]
    },
    {
        id: 67,
        nombre: "Boadilla del Monte",
        lat: 40.4032,
        lng: -3.8770,
        zona: "Periferia",
        subzona: "Oeste",
        precioMedio: 2430,
        precioM2: 16.0,
        metrosCuadrados: 152,
        fuente: "Properfy",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Urbanizaciones de calidad: Montepríncipe, Bonanza, Parque de la Fuente",
            "Ambiente familiar exclusivo - una de las zonas preferidas por ejecutivos",
            "Zonas verdes amplias - Parque de Boadilla y entornos naturales protegidos",
            "Buena calidad de vida - equilibrio entre naturaleza y servicios",
            "Palacio del Infante Don Luis - patrimonio histórico bien conservado",
            "Colegios privados de élite: Virgen de Europa, Casvi, Mirabal",
            "Comunicación aceptable: Autobuses interurbanos y acceso a M-40/M-50",
            "Instalaciones deportivas de calidad: Club de Campo y polideportivos"
        ],
        desventajas: [
            "Sin metro - dependencia total de autobuses y vehículo privado",
            "Totalmente dependiente del coche - imposible vida sin automóvil",
            "Precio elevado - segundo municipio más caro del área metropolitana oeste",
            "Alejado de Madrid centro - 35-40 minutos en transporte en hora punta",
            "Servicios concentrados - necesidad de desplazamientos para compras especializadas",
            "Aislamiento relativo - percepción de vivir en una burbuja residencial",
            "Tráfico en M-501 y accesos - problemas de movilidad en horas laborales"
        ]
    },
    {
        id: 68,
        nombre: "Majadahonda",
        lat: 40.4730,
        lng: -3.8720,
        zona: "Periferia",
        subzona: "Oeste",
        precioMedio: 2170,
        precioM2: 15.6,
        metrosCuadrados: 139,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Nivel de vida alto - equilibrio perfecto entre servicios y tranquilidad",
            "Centros comerciales grandes: Gran Plaza 2 y Equinoccio Majadahonda",
            "Instalaciones deportivas excelentes: Polideportivo Cerro del Aire y clubes privados",
            "Buena oferta educativa: Colegios públicos bien valorados y privados de calidad",
            "Comunicación decente: Cercanías C7, C8, C10 y múltiples líneas de bus",
            "Zonas verdes: Parque de la Mujer y entornos naturales bien cuidados",
            "Servicios sanitarios de calidad: Hospital HM Montepríncipe y centros de salud",
            "Ambiente familiar consolidado - población estable y bien integrada"
        ],
        desventajas: [
            "Sin metro directo - dependencia de Cercanías y autobuses",
            "Coche imprescindible para vida diaria - distancias internas considerables",
            "Tráfico en hora punta A-6 - una de las autovías más congestionadas de España",
            "Precio alto - tercer municipio más caro de la zona oeste",
            "Competencia por plazas escolares - alta demanda en colegios públicos",
            "Presión urbanística - nuevo desarrollo en zonas verdes residuales",
            "Falta de diversidad comercial - predominio de grandes cadenas"
        ]
    },
    {
        id: 69,
        nombre: "Las Rozas",
        lat: 40.4925,
        lng: -3.8738,
        zona: "Periferia",
        subzona: "Oeste",
        precioMedio: 1621,
        precioM2: 15.0,
        metrosCuadrados: 108,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Abril 2025",
        ventajas: [
            "Las Rozas Village - outlet de lujo con más de 100 tiendas premium",
            "Cercanías directo a Madrid - estación Las Rozas con buenas frecuencias",
            "Entorno residencial tranquilo - urbanizaciones bien cuidadas",
            "Buena conectividad A-6 - acceso rápido a Madrid y noroeste",
            "Instalaciones deportivas de élite: Ciudad del Fútbol de la RFEF",
            "Centros comerciales: Heron City y Zoco de Las Rozas",
            "Zonas verdes: Dehesa de Navalcarbón y parques municipales",
            "Oferta educativa diversa: colegios públicos, concertados y privados"
        ],
        desventajas: [
            "Sin metro - solo Cercanías y autobuses como opción pública",
            "Coche necesario para movilidad interna - municipio extenso",
            "Tráfico A-6 problemático - una de las vías más congestionadas de España",
            "Lejos del centro urbano de Madrid - 25-30 minutos en condiciones ideales",
            "Precios en alza constante - gentrificación en proceso avanzado",
            "Dispersión urbana - necesidad de coche para servicios básicos",
            "Falta de identidad urbana clara - crecimiento por urbanizaciones"
        ]
    },

    // ========================================================================
    // ÁREA METROPOLITANA - ZONA NORTE
    // ========================================================================
    {
        id: 70,
        nombre: "Alcobendas",
        lat: 40.5478,
        lng: -3.6410,
        zona: "Periferia",
        subzona: "Norte",
        precioMedio: 1510,
        precioM2: 18.9,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Metro directo L10 - Marqués de la Valdavia y otros 4 stations",
            "Zona empresarial importante - Parque Empresarial La Moraleja y Global Exchange",
            "La Moraleja cercana - acceso a zona de lujo y servicios premium",
            "Servicios de calidad: Hospital Infanta Sofía y centros deportivos modernos",
            "Centros comerciales: Gran Plaza y Plaza Norte 2 muy cercanos",
            "Oferta cultural: Centro de Arte Alcobendas y programación municipal activa",
            "Comunicación excelente: Metro, autobuses y acceso directo a A-1",
            "Equilibrio perfecto - servicios urbanos con ambiente residencial"
        ],
        desventajas: [
            "Precio en alza continua - gentrificación del corredor norte",
            "Mucho tráfico laboral - entrada/salida de polígonos empresariales",
            "Zona muy corporativa - vacío los fines de semana en áreas de oficinas",
            "Pocas zonas de ocio nocturno - ambiente principalmente residencial",
            "Tráfico en A-1 - congestiones frecuentes hacia Madrid",
            "Presión inmobiliaria - nuevo desarrollo en zonas verdes",
            "Falta de identidad propia - entre Madrid y San Sebastián de los Reyes"
        ]
    },
    {
        id: 71,
        nombre: "San Sebastián de los Reyes",
        lat: 40.5525,
        lng: -3.6254,
        zona: "Periferia",
        subzona: "Norte",
        precioMedio: 1500,
        precioM2: 18.75,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Metro L10 - estaciones Baunatal y Reyes Católicos",
            "Micropolix - ciudad infantil educativa única en España",
            "Centro comercial Plaza Norte 2 - uno de los mayores de Madrid",
            "Precio razonable zona norte - más asequible que Alcobendas",
            "Fiestas patronales famosas - tradiciones bien conservadas",
            "Polideportivo Dehesa Boyal - instalaciones deportivas de calidad",
            "Comunicación excelente: Metro, Cercanías C4 y autobuses",
            "Ambiente familiar consolidado - población estable y bien integrada"
        ],
        desventajas: [
            "Lejos del centro Madrid - 25-30 minutos en transporte público",
            "Polígonos industriales en límites - estética urbana mejorable",
            "Ambiente poco urbano - sensación de ciudad dormitorio",
            "Dependencia del transporte - necesidad de vehículo para algunos servicios",
            "Tráfico en A-1 - problemas de movilidad en horas punta",
            "Falta de centro histórico definido - crecimiento urbano reciente",
            "Competencia con Alcobendas - lucha por servicios e inversiones"
        ]
    },
    {
        id: 72,
        nombre: "La Moraleja",
        lat: 40.5122,
        lng: -3.6398,
        zona: "Periferia",
        subzona: "Norte",
        precioMedio: 1664,
        precioM2: 20.8,
        metrosCuadrados: 80,
        fuente: "Idealista",
        fechaActualizacion: "Marzo 2025",
        ventajas: [
            "Zona exclusiva de máximo prestigio - dirección de élite en España",
            "Urbanizaciones de lujo: Club de Campo, Alameda, La Moraleja",
            "Seguridad máxima - vigilancia privada 24/7 y control de accesos",
            "Prestigio social elevado - residentes de alto nivel económico",
            "Colegios internacionales de élite: Runnymede, St. Mary's, SEK",
            "Instalaciones deportivas privadas: clubes de golf, tenis, hípica",
            "Privacidad absoluta - urbanizaciones cerradas y viviendas unifamiliares",
            "Entorno natural cuidado - amplias zonas verdes y jardines privados"
        ],
        desventajas: [
            "Precio muy elevado - entre las zonas más caras de toda España",
            "Pocas viviendas en alquiler - mercado muy restringido y exclusivo",
            "Dependiente del coche - imposible moverse sin vehículo privado",
            "Aislamiento social posible - burbuja de lujo desconectada",
            "Servicios muy exclusivos - precios premium en todo",
            "Falta de diversidad - ambiente social muy homogéneo",
            "Lejos de Madrid centro - 20-25 minutos en coche sin tráfico"
        ]
    },

    // ========================================================================
    // ÁREA METROPOLITANA - ZONA SUR (ECONÓMICA)
    // ========================================================================
    {
        id: 73,
        nombre: "Getafe",
        lat: 40.3057,
        lng: -3.7327,
        zona: "Periferia",
        subzona: "Sur",
        precioMedio: 1498,
        precioM2: 18.7,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Abril 2025",
        ventajas: [
            "Metro y Cercanías directos - L12 y C4 con buenas frecuencias",
            "Universidad Carlos III - campus de prestigio y ambiente juvenil",
            "Hospital universitario Getafe - centro sanitario de referencia",
            "Precio competitivo sur - más asequible que zona norte",
            "Centro comercial Getafe 3 - oferta comercial completa",
            "Polígono industrial importante - oportunidades laborales locales",
            "Servicios municipales consolidados - ciudad madura y completa",
            "Comunicación excelente con Madrid - 20 minutos en Cercanías"
        ],
        desventajas: [
            "Lejos del centro Madrid - 25-30 minutos en transporte público",
            "Imagen industrial histórica - estigma de ciudad fabril",
            "Base aérea cercana - ruido de aviones en algunas zonas",
            "Pocas zonas verdes significativas - falta de grandes parques",
            "Tráfico en A-42 - congestiones frecuentes hacia Madrid",
            "Alta densidad en algunos barrios - bloques de pisos masivos",
            "Falta de atractivo turístico - ciudad funcional y práctica"
        ]
    },
    {
        id: 74,
        nombre: "Leganés",
        lat: 40.3272,
        lng: -3.7636,
        zona: "Periferia",
        subzona: "Sur",
        precioMedio: 1194,
        precioM2: 14.9,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: 
        [
            "Precio asequible - una de las opciones más económicas del sur",
            "Metro directo L12 - conexión con Madrid en 25 minutos",
            "Universidad Carlos III campus - ambiente universitario y juvenil",
            "Parquesur cercano - uno de los centros comerciales más grandes de España",
            "Hospital Severo Ochoa - centro sanitario de referencia sur",
            "Polideportivo Europa - instalaciones deportivas municipales",
            "Comunicación aceptable: Metro, Cercanías C5 y autobuses",
            "Servicios básicos completos - ciudad consolidada y funcional"
        ],
        desventajas: [
            "Zona industrial predominante - polígonos en gran parte del municipio",
            "Lejos del centro - 30-35 minutos en transporte público",
            "Pocas opciones culturales - oferta limitada a básico",
            "Imagen poco atractiva - estética urbana mejorable",
            "Alta densidad en barrios antiguos - bloques de pisos masivos",
            "Tráfico en M-40 y A-42 - problemas de movilidad en horas punta",
            "Falta de identidad propia - ciudad dormitorio por excelencia"
        ]
    },
    {
        id: 75,
        nombre: "Alcorcón",
        lat: 40.3458,
        lng: -3.8242,
        zona: "Periferia",
        subzona: "Sur",
        precioMedio: 1105,
        precioM2: 13.8,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Precio muy económico - opción más asequible del sur con metro",
            "Metro L10 y L12 - conexión directa con Madrid",
            "Tres Aguas centro comercial - oferta comercial completa",
            "Hospital Fundación Alcorcón - centro sanitario de calidad",
            "Parque de Lisboa - zona verde amplia y bien cuidada",
            "Comunicación decente: Metro, Cercanías C5 y autobuses",
            "Servicios municipales consolidados - ciudad madura",
            "Oportunidad de inversión - precios aún asequibles"
        ],
        desventajas: [
            "Densidad muy alta - bloques de pisos masivos en algunos barrios",
            "Pocas zonas verdes significativas - falta de grandes parques",
            "Bloques de pisos monótonos - arquitectura repetitiva años 70-80",
            "Lejos del centro - 35-40 minutos en transporte público",
            "Imagen de ciudad dormitorio - falta de atractivo propio",
            "Tráfico en M-40 y M-50 - problemas de movilidad",
            "Falta de dinamismo comercial - comercio básico y convencional"
        ]
    },
    {
        id: 76,
        nombre: "Móstoles",
        lat: 40.3225,
        lng: -3.8651,
        zona: "Periferia",
        subzona: "Sur",
        precioMedio: 1097,
        precioM2: 13.7,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Uno de los más baratos del área sur - precio muy competitivo",
            "Metro L12 - conexión directa con Madrid",
            "Hospital Universitario - centro sanitario de referencia",
            "URJC campus universitario - ambiente juvenil y dinámico",
            "Centro comercial Dos De Mayo - oferta comercial completa",
            "Comunicación aceptable: Metro y autobuses urbanos",
            "Servicios básicos completos - ciudad consolidada",
            "Oportunidad para primeros alquileres - precios muy asequibles"
        ],
        desventajas: [
            "Muy alejado de Madrid centro - 40-45 minutos en transporte",
            "Densidad excesiva en algunos barrios - masificación evidente",
            "Pocas zonas de ocio y cultura - oferta limitada a básico",
            "Imagen deteriorada - estigma de ciudad problemática en algunos barrios",
            "Tráfico en M-50 y A-5 - problemas graves de movilidad",
            "Falta de atractivo urbano - ciudad funcional sin especial encanto",
            "Competencia con municipios vecinos - lucha por servicios e inversiones"
        ]
    },
    {
        id: 77,
        nombre: "Fuenlabrada",
        lat: 40.2842,
        lng: -3.7947,
        zona: "Periferia",
        subzona: "Sur",
        precioMedio: 1157,
        precioM2: 14.5,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Precio competitivo - equilibrio entre coste y servicios",
            "Metro directo L12 - conexión con Madrid en 35 minutos",
            "Cercanías a Atocha - línea C5 con buenas frecuencias",
            "Servicios básicos completos - ciudad autosuficiente",
            "URJC campus amplio - ambiente universitario importante",
            "Centro comercial Fuenlabrada - oferta comercial completa",
            "Polideportivo Fernando Martín - instalaciones deportivas de calidad",
            "Oportunidad para estudiantes - precios asequibles cerca de universidad"
        ],
        desventajas: [
            "Lejos de Madrid centro - 35-40 minutos en transporte público",
            "Pocos atractivos culturales - oferta limitada a básico",
            "Zona dormitorio por excelencia - falta de vida propia",
            "Pocas zonas verdes significativas - parques pequeños y funcionales",
            "Alta densidad poblacional - masificación en barrios jóvenes",
            "Imagen de ciudad industrial - polígonos dominantes en paisaje",
            "Tráfico en M-406 y A-42 - problemas de movilidad"
        ]    
    },
    {
        id: 78,
        nombre: "Parla",
        lat: 40.2370,
        lng: -3.7703,
        zona: "Periferia",
        subzona: "Sur",
        precioMedio: 1000,
        precioM2: 12.35,
        metrosCuadrados: 81,
        fuente: "Madrid Actual",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Precio más bajo del área sur - opción más económica con conexión",
            "Cercanías directo - línea C4 con conexión a Atocha",
            "Parque Natural El Bosque - amplia zona verde periurbana",
            "Oferta municipal activa - programas sociales y culturales",
            "Centro comercial Parla - oferta comercial básica completa",
            "Comunicación aceptable: Cercanías y autobuses interurbanos",
            "Oportunidad máxima para economías ajustadas - precio imbatible",
            "Cercanía a polígonos industriales - oportunidades laborales locales"
        ],
        desventajas: [
            "Muy alejado (21 km centro) - 45-50 minutos en transporte público",
            "Sin metro - dependencia total de Cercanías",
            "Imagen social negativa - estigma de ciudad problemática",
            "Servicios limitados - falta de opciones especializadas",
            "Alta densidad en barrios jóvenes - masificación evidente",
            "Falta de atractivo urbano - ciudad dormitorio por excelencia",
            "Tráfico en A-42 - problemas graves de movilidad hacia Madrid"
        ]
    },

    // ========================================================================
    // ÁREA METROPOLITANA - ZONA ESTE (ECONÓMICA)
    // ========================================================================
    {
        id: 79,
        nombre: "Alcalá de Henares",
        lat: 40.4818,
        lng: -3.3643,
        zona: "Periferia",
        subzona: "Este",
        precioMedio: 1082,
        precioM2: 13.5,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Abril 2025",
        ventajas: [
            "Patrimonio UNESCO - ciudad histórica bien conservada",
            "Universidad histórica UAH - una de las más antiguas de Europa",
            "Cercanías frecuente - línea C2, C7 con buenas frecuencias",
            "Precio muy asequible - excelente relación calidad-precio",
            "Centro histórico espectacular - corral de comedias, catedral",
            "Ambiente universitario vibrante - vida cultural activa",
            "Servicios completos de ciudad - hospital, centros comerciales",
            "Tradición cultural - Cervantes, corrales, festivales"
        ],
        desventajas: [
            "Muy lejos (35 km) - 50-60 minutos en transporte público",
            "Sin metro - dependencia total de Cercanías",
            "Tiempo de desplazamiento alto - inviable para trabajo diario en Madrid",
            "Limitado para trabajo Madrid - solo opción para teletrabajo o horarios flexibles",
            "Tráfico en A-2 - congestiones frecuentes hacia Madrid",
            "Servicios especializados limitados - necesidad de ir a Madrid para ciertas cosas",
            "Aislamiento relativo - percepción de vivir en otra ciudad"
        ]
    },
    {
        id: 80,
        nombre: "Torrejón de Ardoz",
        lat: 40.4557,
        lng: -3.4766,
        zona: "Periferia",
        subzona: "Este",
        precioMedio: 1000,
        precioM2: 12.5,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Precio muy económico - opción asequible del corredor del Henares",
            "Metro directo L7 extendida - conexión con Madrid en 35 minutos",
            "Parque Europa - réplicas monumentos europeos y zona verde amplia",
            "Base aérea (empleo) - oportunidades laborales en sector defensa",
            "Centro comercial Parque Corredor - oferta comercial completa",
            "Comunicación decente: Metro, Cercanías C2, C7",
            "Servicios básicos consolidados - ciudad madura y funcional",
            "Oportunidad para primeros alquileres - precios muy competitivos"
        ],
        desventajas: [
            "Lejos del centro (20 km) - 40-45 minutos en transporte público",
            "Ruido de aviones - base aérea afecta a calidad acústica",
            "Pocas opciones culturales - oferta limitada a básico",
            "Ambiente limitado - ciudad dormitorio sin especial atractivo",
            "Tráfico en A-2 - problemas de movilidad hacia Madrid",
            "Falta de identidad histórica - ciudad de crecimiento reciente",
            "Dependencia de Madrid - falta de economía propia sólida"
        ]
    },
    {
        id: 81,
        nombre: "Coslada",
        lat: 40.4209,
        lng: -3.5606,
        zona: "Periferia",
        subzona: "Este",
        precioMedio: 920,
        precioM2: 11.5,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "Muy económico - uno de los precios más bajos del área metropolitana",
            "Metro L7 - estación Coslada Central con conexión directa",
            "Cercanías - línea C2, C7 con buenas frecuencias",
            "Conectado con corredor Henares - acceso a toda la zona este",
            "Aeropuerto Madrid-Barajas cercano - oportunidades laborales",
            "Polígono industrial importante - empleo local disponible",
            "Comunicación aceptable - Metro, Cercanías y autobuses",
            "Oportunidad máxima de ahorro - precio casi imbatible con metro"
        ],
        desventajas: [
            "Zona industrial dominante - paisaje urbano poco atractivo",
            "Pocos espacios de ocio - oferta cultural muy limitada",
            "Imagen poco atractiva - estigma de ciudad industrial",
            "Lejos del centro - 35-40 minutos en transporte público",
            "Ruido de aviones - cercanía al aeropuerto afecta calidad vida",
            "Falta de zonas verdes significativas - parques pequeños",
            "Servicios básicos limitados - necesidad de ir a municipios vecinos"
        ]
    },
    {
        id: 82,
        nombre: "San Fernando de Henares",
        lat: 40.4240,
        lng: -3.5351,
        zona: "Periferia",
        subzona: "Este",
        precioMedio: 880,
        precioM2: 11.0,
        metrosCuadrados: 80,
        fuente: "Noticias Municipios",
        fechaActualizacion: "Julio 2025",
        ventajas: [
            "El más barato del área metropolitana - precio absolutamente imbatible",
            "Cercanías - línea C2, C7 con conexión a Madrid",
            "Precio imbatible - oportunidad para economías muy ajustadas",
            "Potencial inversión - posible revalorización futura",
            "Polígono industrial cercano - oportunidades laborales locales",
            "Comunicación básica - Cercanías y autobuses interurbanos",
            "Tranquilidad - menor densidad que municipios vecinos",
            "Oportunidad única - último reducto de precios asequibles con conexión"
        ],
        desventajas: [
            "Muy lejos y poco conocido - aislamiento y falta de servicios",
            "Sin metro - dependencia total de Cercanías",
            "Pocas opciones de servicios - necesidad de desplazamientos constantes",
            "Zona industrial dominante - paisaje urbano poco atractivo",
            "Falta de vida cultural y de ocio - desierto de actividades",
            "Imagen de ciudad abandonada - falta de inversión municipal",
            "Aislamiento total - percepción de vivir en el olvido"
        ],
    },
  // ========================================================================
    // FASE 3A - NUEVOS DISTRITOS (IDs 83-122)
    // ========================================================================
    
    // ========================================================================
    // DISTRITO 11: MONCLOA-ARAVACA (7 barrios)
    // ========================================================================
    {
        id: 83,
        nombre: "Casa de Campo",
        lat: 40.4194,
        lng: -3.7544,
        zona: "Capital",
        distrito: "Moncloa-Aravaca",
        precioMedio: 1320,
        precioM2: 18.0,
        metrosCuadrados: 73,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Junto al parque más grande de Madrid - 1.722 hectáreas de naturaleza",
            "Zona muy tranquila y familiar - ambiente residencial sosegado",
            "Buena conexión con metro Príncipe Pío (L6, L10, Ramal) - intercambiador importante",
            "Aire puro y espacios verdes - calidad ambiental excepcional en la capital",
            "Vistas panorámicas de Madrid - privilegiada situación elevada",
            "Instalaciones deportivas: Club de Campo, piscinas municipales, pistas de tenis",
            "Seguridad y privacidad - zona residencial con baja densidad",
            "Proximidad a Madrid Río y Parque de Atenas - circuito de zonas verdes"
        ],
        desventajas: [
            "Algo alejado del centro histórico - 20-25 minutos andando a puntos centrales",
            "Pocas tiendas y servicios cercanos - dependencia de Príncipe Pío para compras",
            "Transporte público limitado por la noche - menor frecuencia en horarios nocturnos",
            "Zona muy residencial, poco ambiente - vida nocturna casi inexistente",
            "Acceso complicado en coche - carreteras internas del parque poco intuitivas",
            "Falta de comercio de proximidad - necesidad de desplazamientos para compras diarias",
            "Aislamiento relativo - percepción de vivir separado del resto de la ciudad"
        ]
    },
    {
        id: 84,
        nombre: "Argüelles",
        lat: 40.4298,
        lng: -3.7197,
        zona: "Capital",
        distrito: "Moncloa-Aravaca",
        precioMedio: 1680,
        precioM2: 22.0,
        metrosCuadrados: 76,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Muy céntrico y bien comunicado - Argüelles (L3, L4, L6) y Ventura Rodríguez (L3)",
            "Gran oferta de comercios y restaurantes - Calles Princesa, Alberto Aguilera, Marqués de Urquijo",
            "Cerca de Princesa y Moncloa - ejes comerciales y de servicios principales",
            "Ambiente universitario animado - proximidad a Complutense y escuelas superiores",
            "Arquitectura histórica bien conservada - edificios señoriales del siglo XIX",
            "Proximidad a Parque del Oeste y Templo de Debod - zonas verdes emblemáticas",
            "Servicios completos de calidad - colegios, centros de salud, bancos, farmacias",
            "Vida cultural activa - teatros, cines y centros culturales en radio cercano"
        ],
        desventajas: [
            "Precios elevados - entre los más caros del distrito Moncloa-Aravaca",
            "Mucho tráfico y ruido - Calles Princesa y Alberto Aguilera muy transitadas",
            "Zonas muy concurridas - masificación de estudiantes y turistas",
            "Estacionamiento muy difícil - zona de máxima restricción y rotación",
            "Edificios antiguos con problemas de mantenimiento - patios interiores descuidados",
            "Presión turística constante - proximidad a Templo de Debod y Parque del Oeste",
            "Falta de tranquilidad - imposible silencio absoluto en calles principales"
        ]
    },
    {
        id: 85,
        nombre: "Ciudad Universitaria",
        lat: 40.4453,
        lng: -3.7289,
        zona: "Capital",
        distrito: "Moncloa-Aravaca",
        precioMedio: 1420,
        precioM2: 19.5,
        metrosCuadrados: 73,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Ideal para estudiantes - residencias universitarias y colegios mayores",
            "Campus universitario amplio - facultades de Complutense y Politécnica",
            "Mucha oferta cultural - museos, bibliotecas y actividades universitarias",
            "Bien conectado con metro - Moncloa (L3, L6), Ciudad Universitaria (L6)",
            "Zonas verdes extensas - jardines botánicos y áreas deportivas del campus",
            "Ambiente internacional - estudiantes de intercambio y programas Erasmus",
            "Instalaciones deportivas de calidad - piscinas, pistas, gimnasios universitarios",
            "Seguridad vigilada - campus con seguridad privada y vigilancia constante"
        ],
        desventajas: [
            "Muy masificado durante el curso - 80.000 estudiantes diarios en temporada",
            "Pocas opciones de ocio nocturno - ambiente principalmente diurno y académico",
            "Edificios antiguos en algunas zonas - facultades con necesidades de reforma",
            "Servicios pensados para estudiantes - falta de opciones para residentes permanentes",
            "Vacío en periodos vacacionales - ambiente fantasma en verano y navidades",
            "Tráfico caótico en horas de clase - entradas y salidas masivas",
            "Falta de comercio no universitario - todo orientado a población estudiantil"
        ]
    },
    {
        id: 86,
        nombre: "Valdezarza",
        lat: 40.4589,
        lng: -3.7356,
        zona: "Capital",
        distrito: "Moncloa-Aravaca",
        precioMedio: 1380,
        precioM2: 18.5,
        metrosCuadrados: 75,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Barrio tranquilo y residencial - calles poco transitadas y ambiente sosegado",
            "Buena conexión con autobuses - múltiples líneas a Moncloa y Plaza de España",
            "Zonas verdes cercanas - Parque de la Bombilla y Dehesa de la Villa",
            "Comercio de proximidad - Calles Francos Rodríguez y Avenida de la Ilustración",
            "Ambiente familiar consolidado - población residente de larga trayectoria",
            "Precio razonable para zona norte - más asequible que Argüelles o Moncloa",
            "Seguridad y tranquilidad - baja criminalidad y tráfico reducido",
            "Proceso de mejora urbana - rehabilitaciones y mejoras en espacios públicos"
        ],
        desventajas: [
            "Algo alejado del metro - Francos Rodríguez (L7) a 10-15 minutos andando",
            "Pendientes pronunciadas - calles con desniveles importantes",
            "Poca vida nocturna - ambiente estrictamente residencial y familiar",
            "Servicios limitados - falta de opciones culturales y de ocio",
            "Edificios de los años 60-70 - arquitectura funcional sin especial carácter",
            "Falta de dinamismo comercial - comercio muy local y tradicional",
            "Transporte público menos frecuente - dependencia de autobuses con esperas"
        ]
    },
    {
        id: 87,
        nombre: "Aravaca",
        lat: 40.4564,
        lng: -3.7789,
        zona: "Capital",
        distrito: "Moncloa-Aravaca",
        precioMedio: 1520,
        precioM2: 20.0,
        metrosCuadrados: 76,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Zona residencial de calidad - urbanizaciones bien cuidadas y espaciosas",
            "Colegios internacionales cerca - American School, British Council, Liceo Francés",
            "Ambiente familiar y seguro - una de las zonas preferidas por familias",
            "Cerca de la Casa de Campo - acceso directo a zona natural protegida",
            "Comercio local de calidad - boutiques, restaurantes y servicios premium",
            "Tranquilidad absoluta - alejado del ruido y contaminación del centro",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias",
            "Potencial de revalorización - zona en claro proceso de apreciación"
        ],
        desventajas: [
            "Lejos del centro de Madrid - 25-30 minutos en transporte público",
            "Dependencia del coche - necesidad de vehículo para vida diaria",
            "Pocas opciones de metro - Aravaca (ML2) con frecuencias limitadas",
            "Precios en aumento constante - gentrificación en proceso avanzado",
            "Servicios concentrados - necesidad de desplazamientos para compras especializadas",
            "Falta de diversidad social - perfil socioeconómico muy homogéneo",
            "Aislamiento relativo - percepción de vivir en urbanización cerrada"
        ]
    },
    {
        id: 88,
        nombre: "El Plantío",
        lat: 40.4423,
        lng: -3.7645,
        zona: "Capital",
        distrito: "Moncloa-Aravaca",
        precioMedio: 1650,
        precioM2: 21.5,
        metrosCuadrados: 77,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Zona muy exclusiva y tranquila - una de las más prestigiosas de Madrid",
            "Viviendas unifamiliares y chalets - arquitectura de calidad con jardines",
            "Entorno natural privilegiado - límite con Casa de Campo y zonas verdes",
            "Alta seguridad - urbanizaciones cerradas con vigilancia privada",
            "Colegios de élite - SEK El Castillo y otros centros privados prestigiosos",
            "Privacidad absoluta - calles privadas y acceso restringido",
            "Calidad de vida excepcional - equilibrio perfecto entre naturaleza y servicios",
            "Prestigio social - dirección de alto nivel económico y profesional"
        ],
        desventajas: [
            "Precios muy elevados - entre los más caros de Madrid capital",
            "Pocas opciones de alquiler - mercado muy restringido y exclusivo",
            "Transporte público escaso - dependencia total del vehículo privado",
            "Alejado de servicios básicos - necesidad de coche para compras diarias",
            "Aislamiento social posible - burbuja residencial desconectada",
            "Falta de diversidad - ambiente social muy homogéneo y exclusivo",
            "Servicios muy exclusivos - precios premium en todo (colegios, actividades)"
        ]
    },
    {
        id: 89,
        nombre: "Puerta del Ángel",
        lat: 40.4178,
        lng: -3.7389,
        zona: "Capital",
        distrito: "Moncloa-Aravaca",
        precioMedio: 1450,
        precioM2: 19.0,
        metrosCuadrados: 76,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Buena comunicación con autobuses - múltiples líneas a Príncipe Pío y Moncloa",
            "Zona comercial desarrollada - Calles Antonio Leyva y Camino de los Vinateros",
            "Cerca de Princesa - acceso rápido a eje comercial principal",
            "Barrio tranquilo pero bien conectado - equilibrio ideal",
            "Proximidad a Madrid Río - acceso directo a parque fluvial",
            "Servicios básicos completos - farmacias, supermercados, centros de salud",
            "Ambiente familiar consolidado - población residente estable",
            "Precio razonable para zona bien comunicada - buena relación calidad-precio"
        ],
        desventajas: [
            "Sin metro muy cercano - Puerta del Ángel (L6, L10, Ramal) a 10-15 minutos",
            "Algunas zonas en cuesta - desniveles importantes en calles interiores",
            "Tráfico en horas punta - Calles Antonio Leyva y Paseo de Extremadura congestionadas",
            "Servicios justos - falta de opciones culturales y de ocio de calidad",
            "Edificios de los años 50-60 - necesidades de reforma y modernización",
            "Falta de identidad propia - transición entre varios barrios",
            "Comercio básico - pocas opciones alternativas o especializadas"
        ]
    },

    // ========================================================================
    // DISTRITO 12: LATINA (7 barrios)
    // ========================================================================
    {
        id: 90,
        nombre: "Los Cármenes",
        lat: 40.3912,
        lng: -3.7456,
        zona: "Capital",
        distrito: "Latina",
        precioMedio: 1180,
        precioM2: 16.0,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios asequibles - una de las opciones más económicas del oeste",
            "Barrio familiar y tranquilo - calles residenciales poco transitadas",
            "Buena red de autobuses - múltiples líneas a Aluche y Plaza de España",
            "Comercio local variado - Calles Carlos Martín Álvarez y General Ricardos",
            "Ambiente auténtico de barrio - población residente de toda la vida",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Proceso de mejora continua - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Lejos del centro - 25-30 minutos en transporte público",
            "Metro algo distante - Laguna (L6) a 15-20 minutos andando",
            "Pocas zonas verdes significativas - solo pequeñas plazas interiores",
            "Edificios antiguos en algunas zonas - necesidades de reforma",
            "Falta de dinamismo comercial - comercio muy local y básico",
            "Transporte público menos frecuente - esperas más largas que en centro",
            "Imagen de barrio humilde - aunque en proceso de mejora"
        ]
    },
    {
        id: 91,
        nombre: "Puerta del Ángel (Latina)",
        lat: 40.4089,
        lng: -3.7523,
        zona: "Capital",
        distrito: "Latina",
        precioMedio: 1250,
        precioM2: 17.0,
        metrosCuadrados: 74,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Metro Puerta del Ángel (L6, L10, Ramal) - intercambiador importante",
            "Zona comercial activa - Calles Antonio Leyva y Paseo de Extremadura",
            "Bien comunicado - múltiples líneas de autobús y conexión con Príncipe Pío",
            "Ambiente de barrio tradicional - esencia del Madrid castizo",
            "Proximidad a Madrid Río - acceso directo a parque fluvial",
            "Servicios completos: colegios, centros de salud, bancos, farmacias",
            "Arquitectura bien conservada - edificios de los años 40-50 con carácter",
            "Precio competitivo para zona bien comunicada - equilibrio calidad-precio"
        ],
        desventajas: [
            "Algo masificado en horas punta - tránsito constante de vehículos y personas",
            "Tráfico denso en Paseo de Extremadura - una de las vías más transitadas",
            "Ruido en ciertas zonas - actividad comercial y vehicular constante",
            "Estacionamiento complicado - zona de alta rotación y restricción",
            "Edificios antiguos con problemas de mantenimiento - patios interiores",
            "Presión comercial - calles principales muy transitadas y ruidosas",
            "Falta de tranquilidad absoluta - imposible silencio en ejes principales"
        ]
    },
    {
        id: 92,
        nombre: "Lucero",
        lat: 40.3834,
        lng: -3.7689,
        zona: "Capital",
        distrito: "Latina",
        precioMedio: 1150,
        precioM2: 15.5,
        metrosCuadrados: 74,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Uno de los más económicos de Latina - precio muy competitivo",
            "Metro Lucero (L6) - conexión directa con centro en 20 minutos",
            "Multicultural y animado - diversidad de nacionalidades y culturas",
            "Comercios de todo tipo - desde grandes cadenas a tiendas étnicas",
            "Mercado de Lucero - productos frescos y comercio tradicional",
            "Ambiente comercial vibrante - Calles Maqueda y Avenida de los Poblados",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias",
            "Oportunidad para economías ajustadas - precio casi imbatible con metro"
        ],
        desventajas: [
            "Zona algo degradada en partes - necesidades de mejora urbana",
            "Percepción de inseguridad en algunas calles - aunque estadísticas mejoran",
            "Edificios muy antiguos de los años 50-60 - necesidades de reforma integral",
            "Poco espacio verde - solo pequeñas plazas duras interiores",
            "Tráfico intenso en ejes principales - congestión en horas comerciales",
            "Falta de servicios culturales - oferta limitada a comercio básico",
            "Imagen de barrio conflictivo - estigma social persistente aunque injusto"
        ]
    },
    {
        id: 93,
        nombre: "Aluche",
        lat: 40.3923,
        lng: -3.7612,
        zona: "Capital",
        distrito: "Latina",
        precioMedio: 1220,
        precioM2: 16.5,
        metrosCuadrados: 74,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio razonable para zona bien comunicada - equilibrio ideal",
            "Varias estaciones de metro: Aluche (L5), Empalme (L5)",
            "Comercio tradicional fuerte - Calles Illescas y General Fanjul",
            "Barrio muy consolidado - población residente de larga trayectoria",
            "Mercado de Aluche - productos frescos y comercio local",
            "Servicios completos: colegios, centros de salud, bancos, farmacias",
            "Comunicación excelente: Metro L5, Cercanías C5, múltiples autobuses",
            "Ambiente familiar auténtico - esencia del Madrid tradicional"
        ],
        desventajas: [
            "Algo lejos del centro - 20-25 minutos en transporte público",
            "Edificios de los años 60-70 - arquitectura repetitiva y funcional",
            "Tráfico intenso en Calles Illescas y Avenida de los Poblados",
            "Pocas zonas recreativas significativas - falta de grandes parques",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Falta de dinamismo juvenil - población mayoritariamente estable",
            "Imagen de barrio obsoleto - aunque en proceso de revitalización"
        ]
    },
    {
        id: 94,
        nombre: "Las Águilas",
        lat: 40.3756,
        lng: -3.7789,
        zona: "Capital",
        distrito: "Latina",
        precioMedio: 1200,
        precioM2: 16.0,
        metrosCuadrados: 75,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio competitivo - opción asequible del sur de Latina",
            "Metro Las Águilas (L5) - conexión directa con centro",
            "Zona en mejora - proceso de revitalización urbana en curso",
            "Barrio tranquilo y residencial - calles poco transitadas",
            "Comercio local económico - precios asequibles en alimentación",
            "Ambiente familiar consolidado - población residente estable",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Proceso de renovación - mejoras en fachadas y espacios públicos"
        ],
        desventajas: [
            "Algo alejado del centro - 25-30 minutos en transporte público",
            "Servicios limitados - falta de opciones culturales y de ocio",
            "Edificios antiguos de los años 60-70 - necesidades de modernización",
            "Pocas opciones de ocio y cultura - limitado a comercio básico",
            "Transporte público menos frecuente - esperas más largas",
            "Falta de identidad propia - transición entre varios barrios",
            "Imagen de barrio periférico - aunque dentro de Madrid capital"
        ]
    },
    {
        id: 95,
        nombre: "Campamento",
        lat: 40.3845,
        lng: -3.7923,
        zona: "Capital",
        distrito: "Latina",
        precioMedio: 1100,
        precioM2: 15.0,
        metrosCuadrados: 73,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Muy económico - una de las opciones más asequibles de Madrid capital",
            "Cerca de Casa de Campo - acceso directo a mayor parque urbano de Europa",
            "Barrio popular y auténtico - esencia del Madrid castizo",
            "Metro Campamento (L5, L10) - conexión directa con centro",
            "Comercio local muy económico - precios imbatibles en productos básicos",
            "Ambiente tranquilo en calles interiores - alejado de ejes principales",
            "Comunidad vecinal muy unida - asociaciones y actividades comunitarias",
            "Oportunidad para primeros alquileres - precio muy competitivo"
        ],
        desventajas: [
            "Muy alejado del centro - 30-35 minutos en transporte público",
            "Edificios muy antiguos de los años 50-60 - necesidades de reforma integral",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Percepción de lejanía - aislamiento psicológico del resto de Madrid",
            "Falta de dinamismo comercial - comercio orientado a necesidades básicas",
            "Transporte público limitado en horarios nocturnos - menor frecuencia",
            "Imagen de barrio olvidado - falta de inversión municipal en mejoras"
        ]
    },
    {
        id: 96,
        nombre: "Cuatro Vientos",
        lat: 40.3689,
        lng: -3.7956,
        zona: "Capital",
        distrito: "Latina",
        precioMedio: 1080,
        precioM2: 14.5,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio muy asequible - opción más económica de Latina con conexión",
            "Cercanías Cuatro Vientos - línea C5 con conexión directa a Atocha",
            "Zona tranquila y residencial - calles poco transitadas",
            "Cerca del aeródromo - oportunidades laborales en sector aeronáutico",
            "Comercio local económico - precios muy competitivos",
            "Ambiente auténtico de barrio - población residente de toda la vida",
            "Fácil aparcamiento - una de las zonas con menor presión vehicular",
            "Oportunidad máxima de ahorro - último reducto de precios bajos con conexión"
        ],
        desventajas: [
            "Muy alejado del centro - 35-40 minutos en transporte público",
            "Sin metro - dependencia total de Cercanías y autobuses",
            "Pocas opciones comerciales - comercio muy básico y limitado",
            "Dependencia del transporte - necesidad de planificar desplazamientos",
            "Edificios muy antiguos - necesidades de reforma y modernización",
            "Servicios públicos limitados - centros de salud y culturales saturados",
            "Aislamiento total - percepción de vivir en el límite de Madrid"
        ]
    },

    // ========================================================================
    // DISTRITO 13: CARABANCHEL (7 barrios)
    // ========================================================================
    {
        id: 97,
        nombre: "Comillas",
        lat: 40.3823,
        lng: -3.7234,
        zona: "Capital",
        distrito: "Carabanchel",
        precioMedio: 1150,
        precioM2: 15.5,
        metrosCuadrados: 74,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio asequible - opción económica del distrito Carabanchel",
            "Metro Vista Alegre (L5) cerca - conexión directa con centro",
            "Barrio en transformación - proceso de revitalización urbana avanzado",
            "Comercio local activo - Calles General Ricardos y Ocaña",
            "Ambiente multicultural - diversidad de nacionalidades y culturas",
            "Mercado de Comillas - productos frescos y comercio tradicional",
            "Comunicación aceptable: Metro L5 y múltiples líneas de autobús",
            "Oportunidad de inversión - precios aún asequibles con potencial"
        ],
        desventajas: [
            "Zona algo deteriorada en partes - necesidades de mejora urbana",
            "Edificios antiguos de los años 50-60 - necesidades de reforma integral",
            "Lejos del centro - 20-25 minutos en transporte público",
            "Servicios mejorables - falta de opciones culturales y de ocio",
            "Tráfico en ejes principales - Calles Ocaña y General Ricardos congestionadas",
            "Falta de zonas verdes significativas - solo pequeñas plazas interiores",
            "Imagen de barrio conflictivo - estigma social persistente"
        ]
    },
    {
        id: 98,
        nombre: "Opañel",
        lat: 40.3912,
        lng: -3.7189,
        zona: "Capital",
        distrito: "Carabanchel",
        precioMedio: 1180,
        precioM2: 16.0,
        metrosCuadrados: 74,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio competitivo - equilibrio entre coste y servicios",
      "Metro Opañel (L5) - conexión directa con centro en 18 minutos",
      "Zona residencial tranquila - calles poco transitadas",
      "Cerca de Carabanchel Alto - acceso a servicios del distrito",
      "Comercio local en Calles Opañel y Marcelo Usera",
      "Ambiente familiar consolidado - población residente estable",
      "Servicios básicos completos - todo necesario en radio cercano",
      "Proceso de mejora continua - rehabilitaciones y mejoras urbanas"
        ],
        desventajas: [
            "Alejado del centro histórico - 20-25 minutos en transporte público",
            "Poco ambiente nocturno - todo muy residencial y tranquilo",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Edificios antiguos de los años 60-70 - arquitectura funcional",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Falta de dinamismo - población mayoritariamente estable y senior",
            "Transporte público menos frecuente - esperas más largas que en centro"
        ]
    },
    {
        id: 99,
        nombre: "San Isidro",
        lat: 40.3789,
        lng: -3.7123,
        zona: "Capital",
        distrito: "Carabanchel",
        precioMedio: 1120,
        precioM2: 15.0,
        metrosCuadrados: 75,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Muy económico - una de las opciones más asequibles de Carabanchel",
            "Fiestas patronales importantes - tradición de San Isidro Labrador",
            "Ermita histórica - patrimonio cultural del distrito",
            "Barrio tradicional y auténtico - esencia del Carabanchel castizo",
            "Comercio local muy económico - precios imbatibles en productos básicos",
            "Ambiente tranquilo en calles interiores - alejado de ejes principales",
            "Comunidad vecinal muy unida - asociaciones y actividades tradicionales",
            "Oportunidad para economías muy ajustadas - precio casi imbatible"
        ],
        desventajas: [
            "Zona en declive en algunas partes - necesidades de revitalización urgente",
            "Lejos del metro - Opañel (L5) a 15-20 minutos andando",
            "Edificios muy antiguos de los años 50 - necesidades de reforma integral",
            "Servicios limitados al extremo - solo lo más básico disponible",
            "Falta total de opciones culturales y de ocio - desierto de actividades",
            "Transporte público muy limitado - frecuencias escasas y horarios reducidos",
            "Imagen de barrio abandonado - falta de inversión municipal y privada"
        ]
    },
    {
        id: 100,
        nombre: "Vista Alegre",
        lat: 40.3856,
        lng: -3.7334,
        zona: "Capital",
        distrito: "Carabanchel",
        precioMedio: 1200,
        precioM2: 16.5,
        metrosCuadrados: 73,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Metro Vista Alegre (L5) - conexión directa con centro en 15 minutos",
            "Precio razonable para zona bien comunicada - equilibrio calidad-precio",
            "Parque de las Cruces cerca - amplia zona verde con áreas deportivas",
            "Zona familiar y residencial - ambiente tranquilo y seguro",
            "Comercio variado en Calles General Ricardos y Vista Alegre",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Comunicación excelente: Metro L5 y múltiples líneas de autobús",
            "Proceso de renovación urbana - mejoras en espacios públicos y fachadas"
        ],
        desventajas: [
            "Algo alejado del centro histórico - 20-25 minutos en transporte público",
            "Tráfico denso en Calles General Ricardos y Ocaña - ejes muy transitados",
            "Edificios antiguos de los años 60-70 - necesidades de modernización",
            "Pocas opciones de ocio y cultura - limitado a comercio básico",
            "Ruido en calles principales - actividad comercial y vehicular constante",
            "Falta de espacios verdes propios - dependencia de parques exteriores",
            "Imagen de barrio convencional - sin especial atractivo o carácter único"
        ]
    },
    {
        id: 101,
        nombre: "Puerta Bonita",
        lat: 40.3934,
        lng: -3.7445,
        zona: "Capital",
        distrito: "Carabanchel",
        precioMedio: 1220,
        precioM2: 16.5,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Metro Puerta Bonita (L5) - conexión directa con centro en 18 minutos",
            "Cerca de Casa de Campo - acceso a mayor parque urbano de Europa",
            "Zona en mejora constante - proceso de revitalización urbana avanzado",
            "Precio asequible para zona bien comunicada - equilibrio calidad-precio",
            "Comercio local en Calles Eugenia de Montijo y General Ricardos",
            "Ambiente multicultural y diverso - mezcla de residentes de diferentes orígenes",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Comunicación excelente: Metro L5 y múltiples líneas de autobús"
        ],
        desventajas: [
            "Lejos del centro histórico - 20-25 minutos en transporte público",
            "Algunos edificios deteriorados de los años 60 - necesidades de reforma",
            "Servicios justos - falta de opciones culturales y de ocio de calidad",
            "Poco ambiente comercial en calles interiores - comercio concentrado en ejes",
            "Tráfico en Calles General Ricardos y Eugenia de Montijo - ejes congestionados",
            "Falta de zonas verdes propias - dependencia de Casa de Campo",
            "Imagen de barrio conflictivo - estigma social persistente aunque injusto"
        ]
    },
    {
        id: 102,
        nombre: "Buenavista",
        lat: 40.3767,
        lng: -3.7267,
        zona: "Capital",
        distrito: "Carabanchel",
        precioMedio: 1100,
        precioM2: 14.5,
        metrosCuadrados: 76,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Muy económico - una de las opciones más asequibles de Carabanchel",
            "Barrio tranquilo y residencial - calles poco transitadas y ambiente sosegado",
            "Comercio de proximidad económico - precios imbatibles en productos básicos",
            "Zona familiar auténtica - población residente de toda la vida",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Comunidad vecinal muy unida - asociaciones y actividades comunitarias",
            "Proceso de mejora lento pero constante - pequeñas rehabilitaciones",
            "Oportunidad para economías muy ajustadas - precio casi imbatible"
        ],
        desventajas: [
            "Muy alejado del centro - 25-30 minutos en transporte público",
            "Sin metro cercano - Abrantes (L5) a 15-20 minutos andando",
            "Edificios muy antiguos de los años 50-60 - necesidades de reforma integral",
            "Servicios básicos al límite - solo lo más esencial disponible",
            "Falta total de opciones culturales y de ocio - desierto de actividades",
            "Transporte público muy limitado - frecuencias escasas y horarios reducidos",
            "Aislamiento relativo - percepción de vivir en el olvido del distrito"
        ]
    },
    {
        id: 103,
        nombre: "Abrantes",
        lat: 40.3712,
        lng: -3.7389,
        zona: "Capital",
        distrito: "Carabanchel",
        precioMedio: 1050,
        precioM2: 14.0,
        metrosCuadrados: 75,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio muy bajo - opción más económica de Carabanchel con metro",
            "Metro Abrantes (L5) - conexión directa con centro en 20 minutos",
            "Zona en desarrollo - proceso de revitalización urbana en curso",
            "Tranquilo y residencial - calles con poco tráfico y ruido",
            "Comercio local muy económico - precios imbatibles en alimentación",
            "Ambiente auténtico de barrio - esencia del Carabanchel tradicional",
            "Fácil aparcamiento absoluto - nunca problemas de estacionamiento",
            "Oportunidad máxima de ahorro - último reducto de precios bajos con metro"
        ],
        desventajas: [
            "Muy alejado del centro - 30-35 minutos en transporte público",
            "Zona algo degradada en partes - necesidades de mejora urbana urgente",
            "Edificios antiguos de los años 50 - necesidades de reforma integral",
            "Servicios limitados al extremo - solo farmacias y supermercados básicos",
            "Falta de dinamismo comercial - comercio orientado a supervivencia",
            "Transporte público limitado en horarios nocturnos - menor frecuencia",
            "Imagen de barrio abandonado - falta de inversión municipal y privada"
        ]
    },

    // ========================================================================
    // DISTRITO 14: MORATALAZ (5 barrios)
    // ========================================================================
    {
        id: 104,
        nombre: "Pavones",
        lat: 40.4089,
        lng: -3.6445,
        zona: "Capital",
        distrito: "Moratalaz",
        precioMedio: 1280,
        precioM2: 17.5,
        metrosCuadrados: 73,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Metro Pavones (L9) - conexión directa con centro en 15 minutos",
            "Precio razonable para zona bien comunicada - equilibrio calidad-precio",
            "Barrio tranquilo y residencial - calles ordenadas y poco transitadas",
            "Bien comunicado: Metro L9 y múltiples líneas de autobús",
            "Comercio local en Avenida de Moratalaz - opciones variadas",
            "Ambiente familiar consolidado - población residente estable",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Proceso de mejora urbana constante - rehabilitaciones y mejoras"
        ],
        desventajas: [
            "Algo alejado del centro histórico - 20-25 minutos en transporte público",
            "Edificios de los 70-80 - arquitectura repetitiva y funcional",
            "Pocas zonas verdes significativas - solo pequeñas plazas interiores",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Falta de dinamismo - población mayoritariamente estable y senior",
            "Imagen de barrio dormitorio - sin especial atractivo o carácter único"
        ]
    },
    {
        id: 105,
        nombre: "Horcajo",
        lat: 40.4156,
        lng: -3.6389,
        zona: "Capital",
        distrito: "Moratalaz",
        precioMedio: 1250,
        precioM2: 17.0,
        metrosCuadrados: 74,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio competitivo - opción asequible del distrito Moratalaz",
            "Zona residencial bien planificada - calles amplias y ordenadas",
            "Transporte público eficiente - Metro Vinateros (L9) y autobuses",
            "Barrio familiar y tranquilo - ambiente sosegado y seguro",
            "Comercio local en Calles Hacienda de Pavones y Camino de los Vinateros",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Arquitectura uniforme pero bien mantenida - edificios conservados",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias"
        ],
        desventajas: [
            "Lejos del centro - 25-30 minutos en transporte público",
            "Arquitectura monótona - bloques de pisos repetitivos sin carácter",
            "Poco ambiente comercial - comercio muy local y básico",
            "Servicios limitados - falta de opciones culturales y de ocio",
            "Falta de espacios verdes propios - dependencia de parques exteriores",
            "Transporte público menos frecuente - esperas más largas que en centro",
            "Imagen de barrio convencional - sin especial atractivo urbano"
        ]
    },
    {
        id: 106,
        nombre: "Marroquina",
        lat: 40.4023,
        lng: -3.6512,
        zona: "Capital",
        distrito: "Moratalaz",
        precioMedio: 1220,
        precioM2: 16.5,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio asequible - una de las opciones más económicas de Moratalaz",
            "Barrio tranquilo y residencial - calles poco transitadas",
            "Comercio local económico - precios competitivos en alimentación",
            "Zona familiar consolidada - población residente de larga trayectoria",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Servicios básicos completos - farmacias, supermercados, centros de salud",
            "Ambiente auténtico de barrio - esencia del Moratalaz tradicional",
            "Proceso de mejora continua - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Algo alejado del centro - 25-30 minutos en transporte público",
            "Sin metro muy cerca - Vinateros (L9) a 15-20 minutos andando",
            "Edificios antiguos de los años 70 - necesidades de modernización",
            "Pocas opciones de ocio y cultura - limitado a comercio básico",
            "Transporte público menos frecuente - dependencia de autobuses",
            "Falta de dinamismo comercial - comercio orientado a necesidades básicas",
            "Imagen de barrio humilde - aunque en proceso de mejora constante"
        ]
    },
    {
        id: 107,
        nombre: "Media Legua",
        lat: 40.4112,
        lng: -3.6578,
        zona: "Capital",
        distrito: "Moratalaz",
        precioMedio: 1290,
        precioM2: 17.5,
        metrosCuadrados: 74,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Bien comunicado - Metro Artilleros (L9) y múltiples líneas de autobús",
            "Zona residencial consolidada - población estable y bien integrada",
            "Comercio variado en Avenida de Moratalaz - opciones para todos",
            "Barrio tranquilo y seguro - baja criminalidad y tráfico reducido",
            "Servicios completos: colegios, centros de salud, bancos, farmacias",
            "Ambiente familiar auténtico - preferido por familias con niños",
            "Arquitectura bien mantenida - edificios de los 70-80 conservados",
            "Comunicación excelente con centro - 15-20 minutos en metro"
        ],
        desventajas: [
            "Lejos del centro histórico - 20-25 minutos en transporte público",
            "Edificios de los 70 - arquitectura funcional sin especial interés",
            "Pocas zonas verdes significativas - solo plazas pequeñas interiores",
            "Poco ambiente nocturno - todo muy residencial y tranquilo",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Falta de identidad propia - transición entre varios barrios de Moratalaz",
            "Transporte público con esperas - frecuencias mejorables en horarios valle"
        ]
    },
    {
        id: 108,
        nombre: "Fontarrón",
        lat: 40.4178,
        lng: -3.6512,
        zona: "Capital",
        distrito: "Moratalaz",
        precioMedio: 1310,
        precioM2: 18.0,
        metrosCuadrados: 73,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Metro cerca - Artilleros (L9) a 5-10 minutos andando",
            "Zona bien conectada - acceso rápido a M-30 y M-40",
            "Comercio local activo - Calles Fontarrón y Hacienda de Pavones",
            "Barrio familiar y tranquilo - ambiente sosegado y seguro",
            "Servicios básicos de calidad - colegios y centros de salud bien dotados",
            "Arquitectura uniforme pero funcional - edificios bien mantenidos",
            "Comunicación excelente: Metro L9 y múltiples líneas de autobús",
            "Precio razonable para zona bien comunicada - equilibrio ideal"
        ],
        desventajas: [
            "Algo alejado del centro - 20-25 minutos en transporte público",
            "Arquitectura uniforme - bloques de pisos repetitivos sin carácter",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Poco atractivo urbanístico - espacios públicos funcionales sin encanto",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Falta de dinamismo - población mayoritariamente estable",
            "Imagen de barrio dormitorio - ciudad funcional sin especial atractivo"
        ]
    },

    // ========================================================================
    // DISTRITO 15: SAN BLAS-CANILLEJAS (9 barrios)
    // ========================================================================
    {
        id: 109,
        nombre: "Simancas",
        lat: 40.4289,
        lng: -3.6178,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1280,
        precioM2: 17.5,
        metrosCuadrados: 73,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Metro San Blas (L7) - conexión directa con centro en 15 minutos",
            "Precio razonable para zona bien comunicada - equilibrio calidad-precio",
            "Barrio consolidado y maduro - población residente de larga trayectoria",
            "Bien comunicado: Metro L7 y múltiples líneas de autobús",
            "Comercio local en Calles Arcos de Jalón y Alcalá - opciones variadas",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Ambiente familiar auténtico - preferido por familias estables",
            "Proceso de mejora urbana constante - rehabilitaciones y mejoras"
        ],
        desventajas: [
            "Lejos del centro histórico - 20-25 minutos en transporte público",
            "Edificios de los 70-80 - arquitectura repetitiva y funcional",
            "Poco ambiente comercial y de ocio - todo muy residencial",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Tráfico en Calles Alcalá y Arcos de Jalón - ejes muy transitados",
            "Falta de zonas verdes significativas - solo pequeñas plazas interiores",
            "Imagen de barrio convencional - sin especial atractivo o carácter único"
        ]
    },
    {
        id: 110,
        nombre: "Hellín",
        lat: 40.4356,
        lng: -3.6234,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1250,
        precioM2: 17.0,
        metrosCuadrados: 74,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio competitivo - opción asequible del distrito San Blas",
            "Transporte público eficiente - Metro Alsacia (L7) y autobuses",
            "Zona tranquila y residencial - calles poco transitadas",
            "Comercio local económico - precios competitivos en alimentación",
            "Ambiente familiar consolidado - población residente estable",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Proceso de mejora continua - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Alejado del centro - 25-30 minutos en transporte público",
            "Arquitectura antigua de los años 70 - necesidades de modernización",
            "Pocas zonas verdes - solo pequeñas plazas interiores",
            "Servicios limitados - falta de opciones culturales y de ocio",
            "Comercio muy local - pocas opciones de calidad o especializadas",
            "Transporte público menos frecuente - esperas más largas que en centro",
            "Falta de dinamismo - población mayoritariamente estable y senior"
        ]
    },
    {
        id: 111,
        nombre: "Amposta",
        lat: 40.4423,
        lng: -3.6289,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1220,
        precioM2: 16.5,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio asequible - una de las opciones más económicas de San Blas",
            "Barrio tranquilo y residencial - calles con poco tráfico y ruido",
            "Bien conectado - Metro Avenida de Guadalajara (L7) y autobuses",
            "Zona familiar auténtica - población residente de toda la vida",
            "Comercio local muy económico - precios imbatibles en productos básicos",
            "Fácil aparcamiento - una de las zonas con menor presión vehicular",
            "Comunidad vecinal muy unida - asociaciones y actividades tradicionales",
            "Oportunidad para economías ajustadas - precio muy competitivo"
        ],
        desventajas: [
            "Muy alejado del centro - 30-35 minutos en transporte público",
            "Edificios antiguos de los años 70 - necesidades de reforma",
            "Poco ambiente comercial - comercio muy básico y limitado",
            "Servicios básicos - falta de opciones culturales y de ocio",
            "Transporte público limitado - frecuencias escasas en horarios valle",
            "Falta de identidad propia - transición entre varios barrios",
            "Imagen de barrio periférico - aunque dentro de Madrid capital"
        ]
    },
    {
        id: 112,
        nombre: "Arcos",
        lat: 40.4389,
        lng: -3.6123,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1200,
        precioM2: 16.0,
        metrosCuadrados: 75,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Muy económico - opción más asequible de San Blas con conexión",
            "Transporte público aceptable - Metro Alsacia (L7) y autobuses",
            "Barrio obrero tradicional - esencia del San Blas auténtico",
            "Comercio local muy económico - precios imbatibles en básicos",
            "Ambiente tranquilo en calles interiores - alejado de ejes principales",
            "Fácil aparcamiento absoluto - nunca problemas de estacionamiento",
            "Comunidad vecinal histórica - residentes de décadas de convivencia",
            "Oportunidad máxima de ahorro - precio casi imbatible con metro"
        ],
        desventajas: [
            "Lejos del centro - 30-35 minutos en transporte público",
            "Edificios muy antiguos de los años 60 - necesidades de reforma integral",
            "Zona algo degradada en partes - necesidades de mejora urbana urgente",
            "Servicios limitados al extremo - solo lo más básico disponible",
            "Falta total de opciones culturales y de ocio - desierto de actividades",
            "Transporte público muy limitado - frecuencias escasas y horarios reducidos",
            "Imagen de barrio abandonado - falta de inversión municipal"
        ]
    },
    {
        id: 113,
        nombre: "Rosas",
        lat: 40.4456,
        lng: -3.6089,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1180,
        precioM2: 15.5,
        metrosCuadrados: 76,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio muy asequible - opción económica del este de San Blas",
            "Barrio tranquilo y residencial - calles poco transitadas",
            "Zona en desarrollo - proceso de revitalización urbana en curso",
            "Comercio de proximidad económico - precios competitivos",
            "Ambiente familiar auténtico - población residente estable",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Servicios básicos completos - farmacias, supermercados, centros de salud",
            "Oportunidad para primeros alquileres - precio muy competitivo"
        ],
        desventajas: [
            "Muy alejado del centro - 35-40 minutos en transporte público",
            "Sin metro cercano - Alsacia (L7) a 15-20 minutos andando",
            "Arquitectura antigua de los años 70 - necesidades de modernización",
            "Servicios justos - falta de opciones culturales y de ocio",
            "Transporte público muy limitado - dependencia de autobuses con esperas",
            "Falta de dinamismo comercial - comercio orientado a necesidades básicas",
            "Aislamiento relativo - percepción de vivir en el límite de Madrid"
        ]
    },
    {
        id: 114,
        nombre: "Rejas",
        lat: 40.4523,
        lng: -3.5923,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1150,
        precioM2: 15.0,
        metrosCuadrados: 77,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Muy económico - una de las opciones más asequibles de Madrid capital",
            "Cerca del aeropuerto Madrid-Barajas - oportunidades laborales",
            "Zona industrial cercana (empleo) - polígonos de San Blas",
            "Tranquilo y residencial - calles con poco tráfico y ruido",
            "Comercio local muy económico - precios imbatibles en productos básicos",
            "Fácil aparcamiento absoluto - una de las zonas con menor presión vehicular",
            "Comunidad vecinal muy unida - asociaciones y actividades comunitarias",
            "Oportunidad máxima de ahorro - último reducto de precios bajos"
        ],
        desventajas: [
            "Extremadamente alejado del centro - 40-45 minutos en transporte público",
            "Sin metro - dependencia total de autobuses y coche",
            "Servicios muy limitados - solo lo más básico disponible",
            "Dependencia del coche para vida normal - necesidad de vehículo",
            "Ruido de aviones - cercanía al aeropuerto afecta calidad acústica",
            "Falta total de opciones de ocio y cultura - desierto de actividades",
            "Aislamiento total - percepción de vivir fuera de Madrid realmente"
        ]
    },
    {
        id: 115,
        nombre: "Canillejas",
        lat: 40.4478,
        lng: -3.6212,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1240,
        precioM2: 16.5,
        metrosCuadrados: 75,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio razonable para zona con metro - equilibrio calidad-precio",
            "Metro Canillejas (L5) - conexión directa con centro en 20 minutos",
            "Barrio tradicional con historia - antiguo pueblo independiente",
            "Comercio local activo - Calles Alcalá y Avenida de Aragón",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Ambiente familiar consolidado - población residente estable",
            "Comunicación excelente: Metro L5 y múltiples líneas de autobús",
            "Proceso de renovación urbana - mejoras en espacios públicos"
        ],
        desventajas: [
            "Alejado del centro histórico - 25-30 minutos en transporte público",
            "Edificios antiguos de los años 60-70 - necesidades de modernización",
            "Poco ambiente comercial y de ocio - todo muy residencial",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Tráfico en Calles Alcalá y Avenida de Aragón - ejes muy transitados",
            "Falta de zonas verdes significativas - solo pequeñas plazas interiores",
            "Imagen de barrio convencional - sin especial atractivo urbano"
        ]
    },
    {
        id: 116,
        nombre: "Salvador",
        lat: 40.4534,
        lng: -3.6145,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1190,
        precioM2: 16.0,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio competitivo - opción asequible del norte de San Blas",
            "Zona tranquila y residencial - calles poco transitadas",
            "Bien comunicado por autobús - múltiples líneas a Canillejas y centro",
            "Barrio familiar auténtico - población residente de larga trayectoria",
            "Comercio local económico - precios competitivos en alimentación",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Proceso de mejora continua - pequeñas rehabilitaciones constantes"
        ],
        desventajas: [
            "Muy alejado del centro - 30-35 minutos en transporte público",
            "Sin metro muy cerca - Canillejas (L5) a 15-20 minutos andando",
            "Arquitectura monótona - bloques de pisos repetitivos sin carácter",
            "Pocas opciones de ocio y cultura - limitado a comercio básico",
            "Transporte público menos frecuente - dependencia de autobuses con esperas",
            "Falta de dinamismo comercial - comercio orientado a necesidades básicas",
            "Imagen de barrio periférico - aunque dentro de Madrid capital"
        ]
    },
    {
        id: 117,
        nombre: "Vallecas Villa (San Blas)",
        lat: 40.4412,
        lng: -3.6356,
        zona: "Capital",
        distrito: "San Blas-Canillejas",
        precioMedio: 1210,
        precioM2: 16.0,
        metrosCuadrados: 76,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio asequible - opción económica del sur de San Blas",
            "Transporte público eficiente - Metro La Elipa (L2) y autobuses",
            "Barrio tradicional con carácter - esencia del Madrid obrero",
            "Comercio local activo - Calles Arcentales y Hermanos García Noblejas",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Ambiente familiar consolidado - población residente estable",
            "Comunicación aceptable: Metro L2 y múltiples líneas de autobús",
            "Proceso de mejora urbana - rehabilitaciones y mejoras en espacios"
        ],
        desventajas: [
            "Lejos del centro - 25-30 minutos en transporte público",
            "Edificios antiguos de los años 60-70 - necesidades de modernización",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Poco ambiente nocturno - todo muy residencial y tranquilo",
            "Tráfico en ejes principales - Calles Hermanos García Noblejas congestionadas",
            "Falta de zonas verdes significativas - solo pequeñas plazas interiores",
            "Imagen de barrio humilde - aunque en proceso de mejora constante"
        ]
    },

    // ========================================================================
    // DISTRITO 16: BARAJAS (5 barrios)
    // ========================================================================
    {
        id: 118,
        nombre: "Alameda de Osuna",
        lat: 40.4578,
        lng: -3.6012,
        zona: "Capital",
        distrito: "Barajas",
        precioMedio: 1420,
        precioM2: 19.0,
        metrosCuadrados: 75,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Zona residencial de calidad - urbanizaciones bien cuidadas",
            "Metro El Capricho (L5) - conexión directa con centro en 25 minutos",
            "Parque El Capricho cerca - jardín histórico del siglo XVIII",
            "Ambiente tranquilo y seguro - una de las zonas más seguras de Madrid",
            "Colegios públicos bien valorados - oferta educativa de calidad",
            "Comercio local de calidad - boutiques y servicios premium",
            "Arquitectura cuidada - chalets y edificios bajos con carácter",
            "Comunidad vecinal activa - asociaciones y actividades comunitarias"
        ],
        desventajas: [
            "Lejos del centro - 30-35 minutos en transporte público",
            "Precios más altos de Barajas - gentrificación en proceso",
            "Dependencia del transporte - necesidad de metro/coche para moverse",
            "Servicios limitados - falta de opciones culturales y de ocio",
            "Ruido de aviones - cercanía al aeropuerto afecta calidad acústica",
            "Falta de diversidad comercial - comercio básico y convencional",
            "Aislamiento relativo - percepción de vivir en urbanización cerrada"
        ]
    },
    {
        id: 119,
        nombre: "Aeropuerto",
        lat: 40.4712,
        lng: -3.5623,
        zona: "Capital",
        distrito: "Barajas",
        precioMedio: 1180,
        precioM2: 16.0,
        metrosCuadrados: 74,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Cerca del aeropuerto Madrid-Barajas - ideal para tripulaciones",
            "Metro Aeropuerto T1-T2-T3 (L8) - conexión directa con centro",
            "Ideal para viajeros frecuentes - proximidad a terminales",
            "Precio razonable para zona con metro - equilibrio calidad-precio",
            "Oportunidades laborales en sector aeronáutico - empleo cercano",
            "Comunicación excelente: Metro L8 y autobuses aeroportuarios",
            "Servicios aeroportuarios disponibles - tiendas, restaurantes",
            "Ambiente internacional - residentes de diferentes nacionalidades"
        ],
        desventajas: [
            "Ruido de aviones constante - calidad acústica muy afectada",
            "Muy alejado del centro - 35-40 minutos en transporte público",
            "Pocas opciones de ocio y cultura - zona principalmente funcional",
            "Zona poco residencial - ambiente más aeroportuario que vecinal",
            "Servicios limitados a necesidades aeroportuarias - falta de vida local",
            "Tráfico constante de vehículos aeroportuarios - congestión permanente",
            "Falta de comunidad vecinal - población muy fluctuante y temporal"
        ]
    },
    {
        id: 120,
        nombre: "Casco Histórico de Barajas",
        lat: 40.4734,
        lng: -3.5789,
        zona: "Capital",
        distrito: "Barajas",
        precioMedio: 1250,
        precioM2: 17.0,
        metrosCuadrados: 74,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Pueblo tradicional con encanto - núcleo histórico bien conservado",
            "Metro Barajas (L8) - conexión directa con centro en 30 minutos",
            "Comercio local auténtico - tiendas tradicionales y mercerías",
            "Ambiente tranquilo y familiar - esencia del Barajas histórico",
            "Iglesia de San Pedro Apóstol - patrimonio cultural del municipio",
            "Servicios básicos completos: colegios, centros de salud, farmacias"
        ],
        desventajas: [
            "Ruido de aviones constante - despegues y aterrizajes afectan calidad acústica",
            "Muy alejado del centro de Madrid - 35-40 minutos en transporte público",
            "Servicios básicos limitados - falta de opciones culturales y de ocio de calidad",
            "Sin metro - dependencia total de autobuses y vehículo privado",
            "Población fluctuante - muchos residentes temporales por trabajo en aeropuerto",
            "Falta de comunidad vecinal consolidada - población muy mezclada y cambiante",
            "Aislamiento relativo - percepción de vivir en zona aeroportuaria más que en barrio"
        ]
    },
    {
        id: 121,
        nombre: "Timón",
        lat: 40.4645,
        lng: -3.5912,
        zona: "Capital",
        distrito: "Barajas",
        precioMedio: 1200,
        precioM2: 16.0,
        metrosCuadrados: 75,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio asequible para zona aeroportuaria - equilibrio calidad-precio",
            "Cerca del aeropuerto Madrid-Barajas - oportunidades laborales en sector aeronáutico",
            "Zona tranquila y residencial - calles poco transitadas fuera de ejes principales",
            "Buena comunicación por autobús - múltiples líneas al aeropuerto y centro",
            "Comercio local económico - precios competitivos en alimentación y servicios básicos",
            "Ambiente familiar auténtico - población residente estable y bien integrada",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Proceso de mejora urbana constante - rehabilitaciones y mejoras en espacios"
        ],
        desventajas: [
            "Ruido de aviones constante - despegues y aterrizajes afectan calidad acústica",
            "Muy alejado del centro de Madrid - 35-40 minutos en transporte público",
            "Servicios básicos limitados - falta de opciones culturales y de ocio de calidad",
            "Sin metro - dependencia total de autobuses y vehículo privado",
            "Población fluctuante - muchos residentes temporales por trabajo en aeropuerto",
            "Falta de comunidad vecinal consolidada - población muy mezclada y cambiante",
            "Aislamiento relativo - percepción de vivir en zona aeroportuaria más que en barrio"
        ]
    },
    {
        id: 122,
        nombre: "Corralejos",
        lat: 40.4689,
        lng: -3.5856,
        zona: "Capital",
        distrito: "Barajas",
        precioMedio: 1180,
        precioM2: 15.5,
        metrosCuadrados: 76,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Muy económico - una de las opciones más asequibles de Barajas",
            "Zona residencial tranquila - calles con poco tráfico y ambiente sosegado",
            "Tranquilo y seguro - baja criminalidad y tráfico reducido",
            "Cerca del aeropuerto - ideal para empleados del sector aeronáutico",
            "Comercio local muy económico - precios imbatibles en productos básicos",
            "Fácil aparcamiento absoluto - nunca problemas de estacionamiento",
            "Comunidad vecinal muy unida - asociaciones y actividades comunitarias",
            "Oportunidad para economías ajustadas - precio casi imbatible"
        ],
        desventajas: [
            "Ruido constante de aviones - calidad acústica muy afectada 24/7",
            "Extremadamente alejado del centro - 40-45 minutos en transporte público",
            "Servicios muy limitados - solo lo más básico disponible en radio cercano",
            "Sin metro cercano - dependencia total de autobuses con frecuencias limitadas",
            "Falta total de opciones culturales y de ocio - desierto de actividades",
            "Población muy envejecida - falta de rejuvenecimiento generacional",
            "Aislamiento total - percepción de vivir en el olvido del distrito"
        ]
    },
    // ============================================================================
// FASE 3B - DISTRITOS FINALES (IDs 123-148)
// ============================================================================
// AÑADIR ESTOS 26 BARRIOS DESPUÉS DEL ID 122
// Total después de integrar: 148 ubicaciones (131 barrios + 17 municipios)
// ============================================================================

    // ========================================================================
    // DISTRITO 17: USERA (6 barrios)
    // ========================================================================
    {
        id: 123,
        nombre: "Orcasitas",
        lat: 40.3734,
        lng: -3.7034,
        zona: "Capital",
        distrito: "Usera",
        precioMedio: 1100,
        precioM2: 15.0,
        metrosCuadrados: 73,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio muy asequible - una de las opciones más económicas del sur de Madrid",
            "Metro Orcasitas (L3) - conexión directa con centro en 20 minutos",
            "Zona en renovación activa - Plan Integral de Regeneración Urbana en curso",
            "Comercio local muy activo - Mercado de Orcasitas y tiendas tradicionales",
            "Parque de Pradolongo cercano - mayor zona verde del distrito Usera",
            "Ambiente multicultural y diverso - mezcla de culturas y nacionalidades",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Comunidad vecinal muy organizada - asociaciones y actividades comunitarias"
        ],
        desventajas: [
            "Zona algo degradada en algunas calles - necesidades de mejora urbana",
            "Lejos del centro histórico - 25-30 minutos en transporte público",
            "Edificios muy antiguos de los años 60-70 - necesidades de reforma integral",
            "Percepción de inseguridad en algunas zonas - aunque estadísticas mejoran",
            "Tráfico en Calles Dolores Barranco y Amparo Usera - ejes congestionados",
            "Falta de opciones culturales y de ocio - limitado a comercio básico",
            "Estigma social persistente - imagen de barrio conflictivo aunque injusta"
        ]
    },
    {
        id: 124,
        nombre: "Orcasur",
        lat: 40.3678,
        lng: -3.7089,
        zona: "Capital",
        distrito: "Usera",
        precioMedio: 1080,
        precioM2: 14.5,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Uno de los más económicos de Usera - precio casi imbatible en Madrid sur",
            "Metro San Fermín-Orcasur (L3) - conexión directa con centro",
            "Barrio multicultural vibrante - diversidad étnica y cultural",
            "Proyectos de renovación urbana activos - inversión municipal constante",
            "Comercio local muy económico - precios imbatibles en productos básicos",
            "Parque de Pradolongo a 10 minutos - amplia zona verde con instalaciones",
            "Servicios sociales activos - programas de integración y apoyo comunitario",
            "Oportunidad para economías muy ajustadas - último reducto de precios bajos"
        ],
        desventajas: [
            "Zona conflictiva en algunas áreas específicas - problemas puntuales de convivencia",
            "Muy alejado del centro de Madrid - 30-35 minutos en transporte público",
            "Servicios básicos limitados - falta de opciones culturales y de ocio",
            "Edificios deteriorados en algunas manzanas - necesidades de rehabilitación urgente",
            "Transporte público menos frecuente - esperas más largas que en zonas céntricas",
            "Falta de inversión privada - comercio muy local y básico",
            "Imagen social muy negativa - estigma difícil de superar"
        ]
    },
    {
        id: 125,
        nombre: "San Fermín",
        lat: 40.3645,
        lng: -3.7156,
        zona: "Capital",
        distrito: "Usera",
        precioMedio: 1050,
        precioM2: 14.0,
        metrosCuadrados: 75,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio muy bajo - opción más económica de Usera con metro",
            "Metro San Fermín (L3) - conexión directa con centro en 25 minutos",
            "Barrio tranquilo en calles interiores - alejado de ejes principales",
            "Cerca de instalaciones deportivas - polideportivo y pistas municipales",
            "Comercio local muy económico - precios imbatibles en alimentación",
            "Ambiente familiar auténtico - población residente de toda la vida",
            "Fácil aparcamiento - menor presión vehicular que zonas céntricas",
            "Oportunidad máxima de ahorro - precio casi imbatible con conexión"
        ],
        desventajas: [
            "Extremadamente alejado del centro - 35-40 minutos en transporte público",
            "Zona con problemática social compleja - necesidades de intervención social",
            "Edificios muy antiguos de los años 50-60 - necesidades de reforma integral",
            "Pocos servicios disponibles - solo lo más básico en radio cercano",
            "Falta total de opciones culturales y de ocio - desierto de actividades",
            "Transporte público muy limitado - frecuencias escasas en horarios valle",
            "Aislamiento total - percepción de vivir en el olvido del distrito"
        ]
    },
    {
        id: 126,
        nombre: "Almendrales",
        lat: 40.3823,
        lng: -3.7089,
        zona: "Capital",
        distrito: "Usera",
        precioMedio: 1120,
        precioM2: 15.0,
        metrosCuadrados: 75,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio asequible - equilibrio entre coste y servicios en Usera",
            "Metro Usera (L6) - conexión directa con centro en 18 minutos",
            "Comercio local activo y variado - Calles Marcelo Usera y Amparo Usera",
            "Barrio tranquilo y residencial - calles poco transitadas",
            "Servicios básicos completos: colegios, centros de salud, farmacias",
            "Ambiente multicultural consolidado - diversidad bien integrada",
            "Comunicación excelente: Metro L6 y múltiples líneas de autobús",
            "Proceso de mejora urbana constante - rehabilitaciones en curso"
        ],
        desventajas: [
            "Lejos del centro histórico - 20-25 minutos en transporte público",
            "Edificios antiguos de los años 60-70 - necesidades de modernización",
            "Pocas zonas verdes significativas - solo pequeñas plazas interiores",
            "Servicios básicos - falta de opciones culturales y de ocio de calidad",
            "Tráfico en ejes principales - Calles Marcelo Usera congestionadas",
            "Comercio muy convencional - pocas opciones alternativas o modernas",
            "Imagen de barrio humilde - aunque en proceso de mejora constante"
        ]
    },
    {
        id: 127,
        nombre: "Moscardó",
        lat: 40.3878,
        lng: -3.7123,
        zona: "Capital",
        distrito: "Usera",
        precioMedio: 1150,
        precioM2: 15.5,
        metrosCuadrados: 74,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio competitivo - buena relación calidad-precio en Usera",
            "Cerca de Pradolongo - acceso a mayor parque del distrito",
            "Transporte público eficiente - Metro Usera (L6) y autobuses",
            "Zona residencial tranquila - calles ordenadas y poco transitadas",
            "Comercio local en Calles Moscardó y Rafaela Ybarra",
            "Ambiente familiar consolidado - población residente estable",
            "Servicios básicos completos - todo necesario en radio cercano",
            "Proceso de renovación urbana - mejoras en espacios públicos"
        ],
        desventajas: [
            "Algo alejado del centro - 25-30 minutos en transporte público",
            "Edificios de los 60-70 - arquitectura funcional sin carácter",
            "Pocas opciones de ocio y cultura - limitado a comercio básico",
            "Servicios limitados - falta de opciones especializadas",
            "Tráfico en Calles Rafaela Ybarra - eje principal congestionado",
            "Falta de dinamismo comercial - comercio orientado a necesidades básicas",
            "Imagen de barrio convencional - sin especial atractivo urbano"
        ]
    },
    {
        id: 128,
        nombre: "Zofío",
        lat: 40.3912,
        lng: -3.7089,
        zona: "Capital",
        distrito: "Usera",
        precioMedio: 1180,
        precioM2: 16.0,
        metrosCuadrados: 74,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio razonable para zona bien comunicada - equilibrio ideal",
            "Metro Usera (L6) y Plaza Elíptica cerca - intercambiador importante",
            "Bien comunicado: Metro L6, L11 y múltiples líneas de autobús",
            "Comercio activo y variado - Calles Nicolás Usera y General Ricardos",
            "Servicios completos: colegios, centros de salud, bancos, farmacias",
            "Ambiente comercial vibrante - uno de los ejes comerciales de Usera",
            "Comunicación excelente con toda la ciudad - acceso rápido a M-30",
            "Proceso de revitalización comercial - nuevos negocios y servicios"
        ],
        desventajas: [
            "Lejos del centro histórico - 20-25 minutos en transporte público",
            "Tráfico denso (M-30 cerca) - ruido y contaminación constantes",
            "Edificios antiguos de los años 60-70 - necesidades de reforma",
            "Ruido en algunas zonas - actividad comercial y vehicular intensa",
            "Falta de tranquilidad absoluta - imposible silencio en ejes principales",
            "Estacionamiento complicado - zona comercial con alta rotación",
            "Presión comercial constante - calles muy transitadas y ruidosas"
        ]
    },

    // ========================================================================
    // DISTRITO 18: FUENCARRAL-EL PARDO (8 barrios)
    // ========================================================================
    {
        id: 129,
        nombre: "El Pardo",
        lat: 40.5189,
        lng: -3.7734,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1650,
        precioM2: 21.0,
        metrosCuadrados: 79,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Entorno natural privilegiado dentro del Monte de El Pardo, reserva de la biosfera con protección especial",
            "Extrema tranquilidad y baja densidad poblacional (menos de 3.500 habitantes), ideal para desconexión urbana",
            "Palacio Real de El Pardo y monumentos históricos de acceso exclusivo para residentes y visitas guiadas",
            "Seguridad ciudadana excepcional con vigilancia las 24 horas debido a proximidad con instalaciones oficiales",
            "Conexión rápida por M-30 y M-40 hacia noroeste de Madrid (15 min a Puerta de Hierro)",
            "Colegios públicos con ratios alumno-profesor de 12:1, muy por debajo de la media madrileña",
            "Comunidad vecinal muy cohesionada y estable, con alto sentido de pertenencia al barrio",
            "Calidad del aire excelente gracias a la masa forestal circundante y baja densidad de tráfico"
        ],
        desventajas: [
            "Aislamiento significativo del centro de Madrid (45-60 minutos en transporte público)",
            "Dependencia absoluta del vehículo privado para vida diaria y abastecimiento",
            "Oferta comercial y de servicios extremadamente limitada (solo comercios básicos)",
            "Ausencia total de metro y conexiones de transporte público eficientes",
            "Precios inmobiliarios 25% superiores a la media del distrito por exclusividad"
        ]
    },
    {
        id: 130,
        nombre: "Fuentelarreina",
        lat: 40.4789,
        lng: -3.7089,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1380,
        precioM2: 18.5,
        metrosCuadrados: 75,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precio de vivienda 15% inferior a la media de Madrid noroeste con buena relación calidad-precio",
            "Estación de metro Begoña (L10) a 5-10 minutos caminando con conexión directa a Plaza de Castilla",
            "Ambiente residencial tranquilo y familiar con baja rotación de vecinos",
            "Comercio de proximidad bien establecido en calles principales como Avenida de La Victoria",
            "Colegios públicos y concertados con buenas valoraciones en rankings educativos 2024",
            "Fácil acceso a M-40 (salida 16) para conexión rápida con otras zonas de Madrid",
            "Proximidad al Hospital La Paz (10 min en transporte) para necesidades sanitarias especializadas",
            "Zonas verdes mantenidas y áreas infantiles en plazas interiores del barrio"
        ],
        desventajas: [
            "Edificios de construcción años 70-80 que requieren rehabilitación energética",
            "Oferta de ocio nocturno y restauración muy limitada fuera de horario comercial",
            "Dificultad de aparcamiento en horas punta por alta densidad residencial",
            "Conexión deficiente con el centro histórico (mínimo 1 transbordo en metro)",
            "Falta de espacios verdes de gran tamaño dentro del perímetro del barrio"
        ]
    },
    {
        id: 131,
        nombre: "Peñagrande",
        lat: 40.4867,
        lng: -3.7178,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1320,
        precioM2: 18.0,
        metrosCuadrados: 73,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de alquiler más competitivos del distrito (18€/m² vs 21€/m² media distrito)",
            "Estación de metro Antonio Machado (L7) integrada en el tejido urbano del barrio",
            "Tradición comercial arraigada en calles como Peñagrande y Islas Cíes con amplia variedad",
            "Ambiente familiar consolidado con alta presencia de servicios educativos y deportivos",
            "Comunicación directa con centro financiero de AZCA vía L7 (25 minutos)",
            "Centros de salud renovados en 2023 con ampliación de especialidades",
            "Proyectos de rehabilitación de fachadas y mejora de accesibilidad en desarrollo",
            "Ratio de zonas verdes por habitante superior a la media de distritos noroccidentales"
        ],
        desventajas: [
            "Edificios de los años 60-70 con deficiencias en aislamiento acústico y térmico",
            "Espacios verdes de pequeño tamaño y limitada calidad paisajística",
            "Vida nocturna prácticamente inexistente fuera de establecimientos tradicionales",
            "Saturación de transporte público en horas punta por alta dependencia del metro",
            "Falta de equipamientos culturales y de ocio de calidad en el entorno inmediato"
        ]
    },
    {
        id: 132,
        nombre: "Barrio del Pilar",
        lat: 40.4756,
        lng: -3.7234,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1350,
        precioM2: 18.5,
        metrosCuadrados: 73,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Excelente conectividad con 3 estaciones de metro (Pilar, Barrio del Pilar, Peñagrande)",
            "Centro Comercial La Vaguada como polo comercial de referencia en el noroeste de Madrid",
            "Tradición vecinal muy arraigada con amplia red de asociaciones y actividades comunitarias",
            "Amplia oferta educativa con 8 colegios públicos y 6 concertados en radio cercano",
            "Parque de la Vaguada como principal pulmón verde con 6 hectáreas de zonas ajardinadas",
            "Precios de vivienda estables y asequibles para zona tan bien comunicada",
            "Servicios sanitarios completos con Centro de Especialidades del Barrio del Pilar",
            "Frecuentes mejoras urbanísticas con presupuesto específico del Ayuntamiento 2024-2025"
        ],
        desventajas: [
            "Tráfico denso en ejes principales como Avenida de Monforte de Lemos en horas punta",
            "Estética urbana uniforme con predominio de arquitectura de bloques de los 60-70",
            "Limitada oferta de vivienda nueva y rehabilitada de alta calidad",
            "Saturación de zonas comunes y equipamientos por alta densidad poblacional",
            "Dificultad de aparcamiento en superficie con alta rotación de vehículos"
        ]
    },
    {
        id: 133,
        nombre: "La Paz",
        lat: 40.4678,
        lng: -3.6889,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1420,
        precioM2: 19.0,
        metrosCuadrados: 75,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Proximidad inmediata al Hospital Universitario La Paz, centro sanitario de referencia nacional",
            "Excelente comunicación mediante metro Begoña (L10) y múltiples líneas de autobús urbano",
            "Amplia oferta de servicios médicos y farmacéuticos especializados en el entorno",
            "Conexión rápida con M-30 y M-40 para desplazamientos en vehículo privado",
            "Zona bien dotada de comercios de alimentación y servicios diarios en calles principales",
            "Presencia de colegios con programas educativos especializados en ciencias de la salud",
            "Seguridad urbana reforzada por constante flujo de personal sanitario y visitantes",
            "Proyectos de modernización de espacios públicos con presupuesto 2024 aprobado"
        ],
        desventajas: [
            "Tráfico intenso y constante por afluencia al hospital las 24 horas del día",
            "Dificultad extrema de aparcamiento tanto en superficie como en parkings públicos",
            "Edificios con antigüedad media superior a 40 años y necesidades de rehabilitación",
            "Ambiente urbano orientado principalmente a servicios sanitarios más que residencial",
            "Precios de alquiler inflados por demanda de profesionales sanitarios temporales"
        ]
    },
    {
        id: 134,
        nombre: "Valverde",
        lat: 40.4823,
        lng: -3.6989,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1300,
        precioM2: 17.5,
        metrosCuadrados: 74,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de vivienda más competitivos del distrito (17,5€/m² vs 19,5€/m² media)",
            "Ambiente residencial tranquilo y familiar con baja incidencia de ruido y tráfico",
            "Comercio de proximidad bien establecido en eje de Calle de Valverde con variedad suficiente",
            "Fácil acceso a zonas verdes del distrito como Parque de la Vaguada (10 min caminando)",
            "Comunicación aceptable mediante autobuses urbanos que conectan con intercambiadores",
            "Comunidad vecinal estable con baja rotación y buen nivel de convivencia",
            "Proyectos de mejora de accesibilidad y renovación de aceras programados para 2025",
            "Ratio favorable de plazas escolares por habitante en edad educativa"
        ],
        desventajas: [
            "Distancia a estaciones de metro (15-20 min caminando hasta Antonio Machado o Barrio del Pilar)",
            "Edificios de los años 70-80 con necesidades de actualización de instalaciones",
            "Oferta limitada de ocio, restauración y cultura en el entorno inmediato",
            "Dependencia del transporte público para desplazamientos laborales y de estudio",
            "Falta de equipamientos deportivos y culturales de calidad dentro del barrio"
        ]
    },
    {
        id: 135,
        nombre: "Mirasierra",
        lat: 40.4956,
        lng: -3.7289,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1550,
        precioM2: 20.5,
        metrosCuadrados: 76,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Urbanización de alta calidad con viviendas unifamiliares y edificios de baja densidad",
            "Vistas panorámicas excepcionales de la sierra de Madrid y noroeste de la ciudad",
            "Amplias zonas verdes privadas y públicas con excelente mantenimiento y diseño",
            "Ambiente exclusivo y tranquilo con alta seguridad privada y vigilancia 24 horas",
            "Colegios internacionales y de alto prestigio educativo en radio cercano",
            "Conexión rápida con M-40 y M-607 para desplazamientos en vehículo privado",
            "Calidad constructiva superior con materiales premium y acabados de alta gama",
            "Proximidad a instalaciones deportivas exclusivas y clubes sociales privados"
        ],
        desventajas: [
            "Precios inmobiliarios 35% superiores a la media del distrito por exclusividad",
            "Ausencia total de metro y dependencia de autobuses interurbanos para transporte público",
            "Necesidad casi obligatoria de vehículo privado para vida diaria y abastecimiento",
            "Oferta comercial muy limitada y orientada a productos premium de alto coste",
            "Aislamiento relativo del resto de la ciudad y sensación de burbuja residencial"
        ]
    },
    {
        id: 136,
        nombre: "El Goloso",
        lat: 40.5089,
        lng: -3.6889,
        zona: "Capital",
        distrito: "Fuencarral-El Pardo",
        precioMedio: 1280,
        precioM2: 17.5,
        metrosCuadrados: 73,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de vivienda más asequibles del distrito con amplia oferta de vivienda protegida",
            "Entorno natural privilegiado en límite urbano con aire puro y baja contaminación",
            "Extrema tranquilidad y baja densidad de tráfico por situación periférica",
            "Proximidad a instalaciones militares que garantizan alta seguridad en la zona",
            "Comunidad vecinal muy unida con fuerte identidad de barrio tradicional",
            "Amplios espacios abiertos y posibilidades de actividades al aire libre",
            "Conexión directa con la sierra de Madrid mediante carreteras comarcales",
            "Proyectos de desarrollo urbanístico controlado con preservación de entorno natural"
        ],
        desventajas: [
            "Aislamiento extremo del centro de Madrid (mínimo 60-75 minutos en transporte público)",
            "Servicios básicos muy limitados y dependencia de barrios colindantes para abastecimiento",
            "Ausencia total de metro y frecuencia reducida de autobuses interurbanos",
            "Necesidad absoluta de vehículo privado para cualquier actividad cotidiana",
            "Oferta educativa, sanitaria y comercial muy básica e insuficiente para necesidades complejas"
        ]
    },

    // ========================================================================
    // DISTRITO 19: VICÁLVARO (2 barrios)
    // ========================================================================
    {
        id: 137,
        nombre: "Casco Histórico de Vicálvaro",
        lat: 40.4012,
        lng: -3.6089,
        zona: "Capital",
        distrito: "Vicálvaro",
        precioMedio: 1150,
        precioM2: 15.5,
        metrosCuadrados: 74,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de vivienda 25% inferiores a la media de Madrid con excelente relación calidad-precio",
            "Estación de metro Vicálvaro (L9) integrada en el casco urbano con conexión directa a Plaza de Castilla",
            "Conserva el encanto de pueblo tradicional con arquitectura histórica y plaza principal emblemática",
            "Comercio local arraigado en calles peatonales con establecimientos familiares de larga trayectoria",
            "Comunidad vecinal muy activa con numerosas asociaciones y eventos culturales tradicionales",
            "Proyectos de rehabilitación del patrimonio histórico con financiación municipal 2024-2025",
            "Conexión rápida con M-40 (salida 13) para acceso a centros empresariales del este",
            "Ambiente tranquilo y familiar con baja densidad de tráfico en calles interiores"
        ],
        desventajas: [
            "Distancia significativa al centro de Madrid (mínimo 35-40 minutos en transporte público)",
            "Oferta de ocio y restauración limitada a establecimientos tradicionales sin variedad moderna",
            "Proximidad a polígonos industriales que generan tráfico pesado en horarios laborales",
            "Edificaciones antiguas con necesidades de actualización de instalaciones y eficiencia energética",
            "Equipamientos deportivos y culturales básicos sin instalaciones de última generación"
        ]
    },
    {
        id: 138,
        nombre: "Valdebernardo",
        lat: 40.4089,
        lng: -3.6012,
        zona: "Capital",
        distrito: "Vicálvaro",
        precioMedio: 1200,
        precioM2: 16.0,
        metrosCuadrados: 75,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Urbanización moderna y planificada con amplias zonas verdes y diseño urbano coherente",
            "Precios competitivos para vivienda de reciente construcción con mejores estándares de calidad",
            "Excelente conexión mediante metro Valdebernardo (L9) y múltiples líneas de autobús urbano",
            "Parque de Valdebernardo como pulmón verde de 8 hectáreas con lago y zonas deportivas",
            "Equipamientos educativos modernos con colegios públicos de reciente construcción",
            "Comercio de proximidad bien estructurado en centros comerciales abiertos y calles peatonales",
            "Alta seguridad urbana con diseño de manzanas cerradas y vigilancia privada en zonas comunes",
            "Proyectos de movilidad sostenible con amplia red de carriles bici y zonas peatonales"
        ],
        desventajas: [
            "Ambiente urbano algo artificial por ser zona de reciente desarrollo sin tradición vecinal",
            "Dependencia casi total del transporte público para desplazamientos laborales y de ocio",
            "Oferta cultural y de entretenimiento limitada comparada con barrios más consolidados",
            "Sensación de uniformidad arquitectónica sin identidad histórica o elementos distintivos",
            "Servicios especializados (médicos, administrativos) aún en desarrollo y crecimiento"
        ]
    },

    // ========================================================================
    // DISTRITO 20: VILLA DE VALLECAS (1 barrio)
    // ========================================================================
    {
        id: 139,
        nombre: "Villa de Vallecas",
        lat: 40.3778,
        lng: -3.6167,
        zona: "Capital",
        distrito: "Villa de Vallecas",
        precioMedio: 1100,
        precioM2: 14.5,
        metrosCuadrados: 76,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de alquiler más asequibles de Madrid capital con amplia oferta de vivienda protegida",
            "Estación de metro Villa de Vallecas (L1) con conexión directa al centro histórico en 25 minutos",
            "Zona en expansión con numerosos proyectos de desarrollo urbano y nuevas promociones",
            "Viviendas de construcción reciente con certificados energéticos superiores a la media",
            "Comunidad vecinal muy activa y reivindicativa con fuerte identidad de barrio independiente",
            "Amplias zonas de equipamientos públicos construidos en los últimos 5 años",
            "Conexión directa con M-45 y A-3 para desplazamientos en vehículo privado",
            "Proyectos de regeneración urbana con importantes inversiones públicas 2024-2026"
        ],
        desventajas: [
            "Aislamiento perceptivo del resto de Madrid capital con sensación de municipio independiente",
            "Oferta comercial básica y orientada a necesidades diarias sin establecimientos especializados",
            "Infraestructuras de transporte saturadas en horas punta por alta dependencia del metro L1",
            "Servicios públicos (sanitarios, educativos) con ratios usuarios/servicio superiores a la media",
            "Entorno urbano en transformación con obras constantes y espacios sin consolidar"
        ]
    },

    // ========================================================================
    // DISTRITO 21: VILLAVERDE (7 barrios)
    // ========================================================================
    {
        id: 140,
        nombre: "San Cristóbal",
        lat: 40.3456,
        lng: -3.7234,
        zona: "Capital",
        distrito: "Villaverde",
        precioMedio: 1050,
        precioM2: 14.0,
        metrosCuadrados: 75,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios inmobiliarios entre los más bajos de Madrid capital con oportunidades de inversión",
            "Estación de metro Villaverde Alto (L3) proporcionando conexión directa con el centro en 30 minutos",
            "Proximidad a polígonos industriales de Villaverde con oportunidades laborales locales",
            "Comercio tradicional arraigado en calles principales con precios competitivos",
            "Proyectos de regeneración urbana incluidos en Plan Madrid Recupera 2024-2027",
            "Comunidad vecinal multicultural con rica diversidad y convivencia intercultural",
            "Transporte público frecuente y económico con múltiples líneas de autobús complementarias",
            "Centros sociales municipales con amplia programación cultural y formativa gratuita"
        ],
        desventajas: [
            "Percepción de inseguridad en algunas calles secundarias y horarios nocturnos",
            "Edificios con antigüedad media superior a 50 años y necesidades urgentes de rehabilitación",
            "Limitada oferta de zonas verdes de calidad y espacios públicos bien mantenidos",
            "Estigmatización social como zona desfavorecida que afecta a la imagen del barrio",
            "Servicios públicos saturados por alta densidad poblacional y diversidad de necesidades"
        ]
    },
    {
        id: 141,
        nombre: "Butarque",
        lat: 40.3534,
        lng: -3.7389,
        zona: "Capital",
        distrito: "Villaverde",
        precioMedio: 1080,
        precioM2: 14.5,
        metrosCuadrados: 74,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de vivienda extremadamente competitivos para Madrid capital",
            "Estación de metro Villaverde Alto (L3) a distancia caminable con conexiones directas",
            "Ambiente residencial tranquilo con baja incidencia de conflictos vecinales",
            "Proximidad al Parque de Butarque como principal zona verde del distrito",
            "Comunidad vecinal estable con baja rotación y buen nivel de convivencia",
            "Proyectos de mejora de infraestructuras incluidos en presupuestos participativos 2025",
            "Comercio de proximidad suficiente para necesidades diarias con precios ajustados",
            "Fácil acceso a M-40 y M-45 para desplazamientos en vehículo privado"
        ],
        desventajas: [
            "Aislamiento geográfico marcado con sensación de desconexión del resto de Madrid",
            "Oferta de servicios especializados muy limitada y dependencia de barrios colindantes",
            "Edificaciones antiguas con deficiencias en aislamiento y eficiencia energética",
            "Vida social y cultural prácticamente inexistente fuera del ámbito familiar",
            "Escasas oportunidades laborales locales y necesidad de desplazamientos largos"
        ]
    },
    {
        id: 142,
        nombre: "Los Rosales",
        lat: 40.3389,
        lng: -3.7089,
        zona: "Capital",
        distrito: "Villaverde",
        precioMedio: 1020,
        precioM2: 13.5,
        metrosCuadrados: 76,
        fuente: "Fotocasa",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de alquiler entre los más bajos del mercado madrileño con amplia disponibilidad",
            "Estación de metro San Cristóbal (L3) integrada en el tejido urbano del barrio",
            "Proyectos activos de renovación urbana con financiación europea Next Generation",
            "Tradición obrera y lucha vecinal que ha generado fuerte cohesión comunitaria",
            "Comercio local muy económico especializado en productos básicos y de primera necesidad",
            "Transporte público económico y frecuente con bonificaciones para colectivos vulnerables",
            "Centros sociales autogestionados con amplia oferta de actividades comunitarias",
            "Proximidad a servicios municipales del distrito con atención directa y personalizada"
        ],
        desventajas: [
            "Áreas específicas con problemáticas sociales complejas y necesidad de intervención",
            "Edificios con grado avanzado de deterioro y necesidades estructurales de rehabilitación",
            "Percepción de inseguridad consolidada que afecta a la imagen y valoración del barrio",
            "Servicios públicos básicos con ratios de atención superiores a la media madrileña",
            "Entorno urbano descuidado en algunas zonas con falta de mantenimiento municipal"
        ]
    },
    {
        id: 143,
        nombre: "Los Ángeles",
        lat: 40.3489,
        lng: -3.7156,
        zona: "Capital",
        distrito: "Villaverde",
        precioMedio: 1050,
        precioM2: 14.0,
        metrosCuadrados: 75,
        fuente: "OCU",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios inmobiliarios muy por debajo de la media de Madrid capital",
            "Estación de metro Los Ángeles (L3) proporcionando conectividad esencial",
            "Comercio de proximidad bien establecido en ejes comerciales tradicionales",
            "Ambiente familiar consolidado con baja rotación de población residente",
            "Comunidad vecinal con fuerte sentido de pertenencia e identidad local",
            "Proyectos de mejora de accesibilidad y eliminación de barreras arquitectónicas",
            "Transporte público adaptado y accesible para personas con movilidad reducida",
            "Centros de salud con programas específicos para población en situación vulnerable"
        ],
        desventajas: [
            "Procesos de degradación urbana avanzados en algunas manzanas y espacios públicos",
            "Edificaciones con necesidades urgentes de rehabilitación integral y modernización",
            "Limitada oferta de empleo local y alta dependencia de desplazamientos laborales",
            "Servicios educativos y culturales básicos sin programas especializados o innovadores",
            "Estigmatización territorial que dificulta la atracción de inversiones y nuevos residentes"
        ]
    },
    {
        id: 144,
        nombre: "San Andrés",
        lat: 40.3567,
        lng: -3.7267,
        zona: "Capital",
        distrito: "Villaverde",
        precioMedio: 1100,
        precioM2: 14.5,
        metrosCuadrados: 76,
        fuente: "Bankinter",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de vivienda extremadamente competitivos dentro de la oferta madrileña",
            "Estación de Cercanías San Cristóbal proporcionando conexión directa con Atocha en 15 minutos",
            "Ambiente residencial tranquilo y familiar con bajo nivel de conflictividad",
            "Comercio local económico especializado en productos de primera necesidad",
            "Comunidad vecinal estable con relaciones intergeneracionales consolidadas",
            "Proyectos de mejora de espacios públicos incluidos en planes de inversión local",
            "Fácil acceso a principales vías de circulación para desplazamientos en vehículo",
            "Centros municipales con programas específicos para tercera edad y familias"
        ],
        desventajas: [
            "Edificios con antigüedad superior a 60 años y necesidades estructurales de intervención",
            "Oferta de servicios públicos básica sin especialización ni programas innovadores",
            "Entorno urbano con carencias estéticas y necesidad de renovación paisajística",
            "Limitadas oportunidades de desarrollo personal y profesional dentro del barrio",
            "Percepción de estancamiento urbano y falta de proyección de futuro"
        ]
    },
    {
        id: 145,
        nombre: "El Espinillo",
        lat: 40.3623,
        lng: -3.7423,
        zona: "Capital",
        distrito: "Villaverde",
        precioMedio: 1000,
        precioM2: 13.0,
        metrosCuadrados: 77,
        fuente: "Properfy",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios de alquiler más bajos de Madrid capital con oportunidades únicas de acceso a vivienda",
            "Estación de Cercanías El Espinillo con conexiones directas a principales intercambiadores",
            "Proyectos activos de regeneración urbana con importante inversión pública 2024-2026",
            "Comunidad vecinal muy cohesionada con fuerte capacidad de organización y reivindicación",
            "Amplios espacios libres y solares con potencial para desarrollo de equipamientos",
            "Programas municipales específicos de apoyo a familias en situación de vulnerabilidad",
            "Transporte público bonificado para colectivos con dificultades económicas",
            "Proximidad a grandes espacios naturales periurbanos con valor ambiental"
        ],
        desventajas: [
            "Problemáticas sociales complejas que requieren intervención especializada y continuada",
            "Edificaciones con grado crítico de deterioro y necesidades de realojo en algunos casos",
            "Estigmatización social muy marcada que afecta a oportunidades de sus residentes",
            "Servicios públicos insuficientes para la complejidad de necesidades existentes",
            "Aislamiento geográfico y social que limita la integración con el resto de la ciudad"
        ]
    },
    {
        id: 146,
        nombre: "Los Ángeles (Villaverde Bajo)",
        lat: 40.3423,
        lng: -3.7334,
        zona: "Capital",
        distrito: "Villaverde",
        precioMedio: 1030,
        precioM2: 13.5,
        metrosCuadrados: 76,
        fuente: "Idealista",
        fechaActualizacion: "Octubre 2025",
        ventajas: [
            "Precios inmobiliarios muy por debajo de la media madrileña con alta disponibilidad",
            "Proximidad a polígonos industriales con oportunidades de empleo local accesible",
            "Comunicación aceptable mediante combinación de metro y autobuses urbanos",
            "Ambiente residencial tranquilo en calles interiores con bajo tráfico rodado",
            "Comercio local muy económico adaptado a poder adquisitivo de la población",
            "Comunidad vecinal con fuerte arraigo y relaciones de proximidad consolidadas",
            "Programas municipales de activación económica y apoyo al pequeño comercio",
            "Espacios libres con potencial para desarrollo de nuevos equipamientos públicos"
        ],
        desventajas: [
            "Procesos de envejecimiento urbano avanzados con necesidad de intervención integral",
            "Edificaciones obsoletas con deficiencias en seguridad, accesibilidad y eficiencia",
            "Oferta de servicios especializados prácticamente inexistente en el entorno inmediato",
            "Limitadas oportunidades educativas y formativas de calidad dentro del barrio",
            "Percepción de abandono institucional que afecta a la autoestima colectiva"
        ]
    },
    ];

// Estadísticas generales
console.log(`📊 Total de ubicaciones: ${barriosMadrid.length}`);
console.log(`🏘️ Barrios de Madrid Capital: ${barriosMadrid.filter(b => b.zona === "Capital").length}`);
console.log(`🌆 Municipios metropolitanos: ${barriosMadrid.filter(b => b.zona === "Metropolitana").length}`);

// ============================================================================
// CONFIGURACIÓN Y FUNCIONES AUXILIARES
// ============================================================================

const configuracionMapa = {
    centroMadrid: {
        lat: 40.4168,
        lng: -3.7038
    },
    zoomInicial: 11,
    zoomMaximo: 18,
    zoomMinimo: 10,
    
    // Rangos actualizados con datos reales 2025
    rangosPrecio: {
        muyBajo: { min: 0, max: 1000, color: '#22c55e', label: 'Muy Económico' },
        bajo: { min: 1000, max: 1300, color: '#84cc16', label: 'Económico' },
        medio: { min: 1300, max: 1600, color: '#eab308', label: 'Medio' },
        medioAlto: { min: 1600, max: 1900, color: '#f97316', label: 'Medio-Alto' },
        alto: { min: 1900, max: Infinity, color: '#ef4444', label: 'Alto/Premium' }
    },
    
    ultimaActualizacion: '2025-08-30',
    version: '2.0.0-fase2',
    totalUbicaciones: 82
};

/**
 * Obtiene el color según el precio (rangos actualizados 2025)
 */
function obtenerColorPorPrecio(precio) {
    if (precio < 1000) return '#22c55e';  // Verde - Muy económico
    if (precio < 1300) return '#84cc16';  // Verde lima - Económico
    if (precio < 1600) return '#eab308';  // Amarillo - Medio
    if (precio < 1900) return '#f97316';  // Naranja - Medio-Alto
    return '#ef4444';                      // Rojo - Alto/Premium
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        barriosMadrid,
        configuracionMapa,
        obtenerColorPorPrecio
    };
}
module.exports = { barriosMadrid };
console.log(`

🏠 DATASET COMPLETADO - ENRIQUECIMIENTO FINALIZADO
====================================
📊 Total ubicaciones: 146 barrios ${barriosMadrid.length}
🏛️ Madrid Capital: (21 distritos) ${barriosMadrid.filter(b => b.zona === 'Capital').length} (21 distritos)
🌳 Área Metropolitana: 17 municipios ${barriosMadrid.filter(b => b.zona === 'Periferia').length} 
📅 Última actualización: Octubre 2025
🎯 Versión: 3.0.1-final

🎯 ENRIQUECIMIENTO:
✅ 5-8 ventajas específicas por barrio
✅ 3-5 desventajas equilibradas  

💎 DIAMANTE EN BRUTO - 30+ HORAS DE TRABAJO
🌟 **VALOR POTENCIAL:**
- Base para aplicaciones inmobiliarias inteligentes
- Herramienta de análisis urbano
- Sistema de recomendación personalizado
- Dataset de referencia para Madrid

❤️ HECHO CON AMOR DE MADRID Y POR MADRID
=========================================

🏠 **UN PROYECTO CON ALMA:**
- Creado con cariño por la ciudad que nos acoge
- Cada barrio investigado con respeto y dedicación
- Pensado para ayudar a quienes buscan su hogar en Madrid

🤝 **CON LA MIRADA PUESTA EN:**
- Familias buscando su vivienda ideal
- Jóvenes emprendiendo su vida independiente
- Personas que eligen Madrid como su nuevo hogar

🎯 **CON EL OBJETIVO DE:**
- Hacer más fácil la búsqueda de vivienda
- Mostrar la auténtica esencia de cada barrio
- Crear comunidad alrededor de nuestro Madrid

**Porque Madrid no es solo una ciudad, es nuestro hogar.** ❤️🏠
`);