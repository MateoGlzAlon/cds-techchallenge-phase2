package com.backend.repository.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.Hotel;
import com.backend.persistence.HotelOccupancy;
import com.backend.persistence.Opinion;

@Repository
public interface HotelRepository extends Neo4jRepository<Hotel, Long> {
    @Query("""
                MATCH (h:Hotel {nombre: $name})
                OPTIONAL MATCH (h)-[:TIENE_OCUPACION]->(o:HotelOccupancy)
                RETURN
                    o.id AS id,
                    o.fecha AS date,
                    o.tasa_ocupacion AS occupancyRate,
                    o.reservas AS confirmedBookings,
                    o.cancelaciones AS cancellations,
                    o.precio_promedio AS averagePricePerNight,
                    o.consumo_energia_kwh AS energyConsumption,
                    o.residuos_generados_kg AS wasteGenerated,
                    o.porcentaje_reciclaje AS recyclingRate,
                    o.uso_agua_m3 AS waterUsage
            """)
    List<HotelOccupancy> findOccupanciesByHotelName(@Param("name") String name);

    // Optional<Hotel> findByNombreWithOpinions(String nombre);

    Optional<Hotel> findByName(String name);

    List<Hotel> findAll();

    @Query("MATCH (h:Hotel {nombre: $nombreHotel})<-[:OPINA_SOBRE]-(o:Opinion) " +
            "RETURN o.id AS id, o.comentario AS comentario, o.puntuacion AS puntuacion, o.tipo_servicio AS tipoServicio")
    List<Opinion> findByOpinionsHotelNombre(@Param("nombreHotel") String nombreHotel);

}
