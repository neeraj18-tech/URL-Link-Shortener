package com.url.shortner.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.url.shortner.models.ClickEvent;
import com.url.shortner.models.UrlMapping;

public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {
    List<ClickEvent> findByUrlMapping(UrlMapping urlMapping);
}
