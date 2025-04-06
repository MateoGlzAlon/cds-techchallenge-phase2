package com.backend.persistence;
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

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Punto getDestino() {
        return destino;
    }
    
    public void setDestino(Punto destino) {
        this.destino = destino;
    }
    
    public Punto getOrigen() {
        return origen;
    }
    
    public void setOrigen(Punto origen) {
        this.origen = origen;
    }
    
    public Integer getBicicleta() {
        return bicicleta;
    }
    
    public void setBicicleta(Integer bicicleta) {
        this.bicicleta = bicicleta;
    }
    
    public Integer getTranvia() {
        return tranvia;
    }
    
    public void setTranvia(Integer tranvia) {
        this.tranvia = tranvia;
    }
    
    public Integer getCocheCompartido() {
        return cocheCompartido;
    }
    
    public void setCocheCompartido(Integer cocheCompartido) {
        this.cocheCompartido = cocheCompartido;
    }
    
    public Integer getMetro() {
        return metro;
    }
    
    public void setMetro(Integer metro) {
        this.metro = metro;
    }
    
    public Integer getTaxi() {
        return taxi;
    }
    
    public void setTaxi(Integer taxi) {
        this.taxi = taxi;
    }
    
    public Integer getAutobus() {
        return autobus;
    }
    
    public void setAutobus(Integer autobus) {
        this.autobus = autobus;
    }

    @Override
    public String toString() {
        return "Option{" +
                "id=" + this.id +
                ", bicicleta=" + this.bicicleta +
                ", tranvia=" + this.tranvia +
                ", cocheCompartido=" + this.cocheCompartido +
                ", metro=" + this.metro +
                ", taxi=" + this.taxi +
                ", autobus=" + this.autobus +
                '}';
    }

    
}
