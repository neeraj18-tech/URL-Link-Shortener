package com.url.shortner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UrlShortnerSbApplication {

	public static void main(String[] args) {
		SpringApplication.run(UrlShortnerSbApplication.class, args);
	}

}

//package run ke liye
//mvn clean package
//java -jar target/url-shortner-sb-0.0.1-SNAPSHOT.jar