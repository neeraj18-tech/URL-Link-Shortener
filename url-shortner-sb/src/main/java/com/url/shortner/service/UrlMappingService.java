package com.url.shortner.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.url.shortner.dto.UrlMappingDTO;
import com.url.shortner.models.ClickEvent;
import com.url.shortner.models.UrlMapping;
import com.url.shortner.models.User;
import com.url.shortner.repository.ClickEventRepository;
import com.url.shortner.repository.UrlMappingRepository;

@Service
public class UrlMappingService {

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    @Autowired
    private ClickEventRepository clickEventRepository;

    /* ===================== CREATE SHORT URL ===================== */

    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());

        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    /* ===================== DTO CONVERTER ===================== */

    private UrlMappingDTO convertToDto(UrlMapping urlMapping) {
        UrlMappingDTO dto = new UrlMappingDTO();
        dto.setId(urlMapping.getId());
        dto.setOriginalUrl(urlMapping.getOriginalUrl());
        dto.setShortUrl(urlMapping.getShortUrl());
        dto.setClickCount(urlMapping.getClickCount());
        dto.setCreatedDate(urlMapping.getCreatedDate());
        dto.setUsername(urlMapping.getUser().getUsername());
        return dto;
    }

    /* ===================== SHORT URL GENERATOR ===================== */

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();

        StringBuilder shortUrl = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    /* ===================== FETCH USER URLS ===================== */

    public List<UrlMappingDTO> getMyUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /* ===================== REDIRECT + CLICK TRACK ===================== */

    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
        }

        return urlMapping;
    }

    /* ===================== URL ANALYTICS (SINGLE URL) ===================== */

    public Map<String, Integer> getUrlAnalytics(
        String username,
        String shortCode,
        String startDateStr,
        String endDateStr
) {

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");

    LocalDate startDate = LocalDate.parse(startDateStr, formatter);
    LocalDate endDate = LocalDate.parse(endDateStr, formatter);

    UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortCode);
    if (urlMapping == null || !urlMapping.getUser().getUsername().equals(username)) {
        throw new RuntimeException("URL not found or unauthorized");
    }

    List<ClickEvent> clickEvents = clickEventRepository.findByUrlMapping(urlMapping);

    // Step 1: actual clicks grouped by date
    Map<LocalDate, Integer> rawClicks = clickEvents.stream()
        .filter(click -> {
            LocalDate date = click.getClickDate().toLocalDate();
            return !date.isBefore(startDate) && !date.isAfter(endDate);
        })
        .collect(Collectors.groupingBy(
            click -> click.getClickDate().toLocalDate(),
            Collectors.summingInt(e -> 1)
        ));

    // Step 2: fill missing dates with 0
    Map<String, Integer> finalResult = startDate
        .datesUntil(endDate.plusDays(1))
        .collect(Collectors.toMap(
            date -> date.format(formatter),
            date -> rawClicks.getOrDefault(date, 0),
            (a, b) -> a,
            java.util.LinkedHashMap::new
        ));

    return finalResult;
}


    /* ===================== TOTAL CLICKS (ALL URLS) ===================== */

    public Map<String, Integer> getTotalClicks(
            String username,
            String startDateStr,
            String endDateStr) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-yyyy");
        LocalDate startDate = LocalDate.parse(startDateStr, formatter);
        LocalDate endDate = LocalDate.parse(endDateStr, formatter);

        List<UrlMapping> urls = urlMappingRepository.findByUserUsername(username);

        List<ClickEvent> clickEvents = urls.stream()
                .flatMap(url -> clickEventRepository.findByUrlMapping(url).stream())
                .toList();

        Map<String, Integer> clicksByDate = clickEvents.stream()
                .filter(click -> {
                    LocalDate date = click.getClickDate().toLocalDate();
                    return !date.isBefore(startDate) && !date.isAfter(endDate);
                })
                .collect(Collectors.groupingBy(
                        click -> click.getClickDate()
                                .toLocalDate()
                                .format(formatter),
                        Collectors.summingInt(e -> 1)
                ));

        if (clicksByDate.isEmpty()) {
            return Map.of(startDate.format(formatter), 1);
        }

        return clicksByDate;
    }
}
