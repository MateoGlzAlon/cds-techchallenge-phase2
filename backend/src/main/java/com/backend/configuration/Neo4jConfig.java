package com.backend.configuration;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Neo4jConfig is a configuration class for the Neo4j database.
 */
@Configuration
public class Neo4jConfig {

    /**
     * neo4jDriver creates and returns a Neo4j driver instance.
     * @return A Neo4j driver instance.
     */
    @Bean
    public Driver neo4jDriver() {
        //TODO
        return GraphDatabase.driver("bolt://neo4j:7687", AuthTokens.basic("neo4j", "12345678"));
    }
}