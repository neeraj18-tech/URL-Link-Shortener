package com.url.shortner.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortner.models.UrlMapping;
import com.url.shortner.service.UrlMappingService;

import lombok.AllArgsConstructor;
@RestController
@AllArgsConstructor
public class RedirectController {

    private final UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl) {

        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);

        if (urlMapping != null) {
            return ResponseEntity
                    .status(302)
                    .header(HttpHeaders.LOCATION, urlMapping.getOriginalUrl())
                    .build();
        }

        return ResponseEntity.notFound().build();
    }
}
