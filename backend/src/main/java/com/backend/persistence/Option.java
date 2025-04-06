package com.backend.persistence;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.RelationshipProperties;
import org.springframework.data.neo4j.core.schema.TargetNode;
import org.springframework.data.neo4j.core.schema.Property;
import org.springframework.data.annotation.Transient;
import org.springframework.data.neo4j.core.schema.Id;
import com.backend.persistence.Punto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RelationshipProperties
public class Option {

    @Id
    @GeneratedValue
    private Long id;

    @TargetNode
    @JsonBackReference("punto-opciones")
    private Punto destino;
    
    @Transient
    private Punto origen;

    @Property("Bicicleta")
    private Integer bicicleta;

    @Property("Tranvía")
    private Integer tranvia;

    @Property("Coche compartido")
    private Integer cocheCompartido;

    @Property("Metro")
    private Integer metro;

    @Property("Taxi")
    private Integer taxi;

    @Property("Autobús")
    private Integer autobus;

    
}
