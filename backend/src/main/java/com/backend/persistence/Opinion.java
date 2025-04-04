package com.backend.persistence;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.neo4j.core.schema.Relationship;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Node("Opinion")
public class Opinion {
    @Id
    @GeneratedValue
    private Long id;

    @Property("comentario")
    private String comentario;

    @Property("puntuacion")
    private Integer puntuacion;

    @Property("tipo_servicio")
    private String tipoServicio;
}
