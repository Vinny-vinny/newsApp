FROM php:8.2.10-fpm-bullseye

# Environment variables for PHP and Nginx
ENV PATH="./vendor/bin:${PATH}" \
    NGINX_SERVER_NAME="_" \
    PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="6000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="128"

# Update package lists and install dependencies
RUN apt-get update \
    && apt-get -y --no-install-recommends install \
       procps \
       curl \
       zip \
       unzip \
       git \
       libfreetype6-dev \
       libjpeg62-turbo-dev \
       libpng-dev \
       libjpeg-dev \
       python2  \
       zlib1g-dev \
       libicu-dev \
       g++ \
       libonig-dev \
       libxml2-dev \
       libzip-dev \
       sqlite3 \
       nginx \
       default-mysql-client \
    # Install PHP extensions
    && docker-php-ext-install mbstring pdo pdo_mysql opcache pcntl \
    && pecl install apcu xdebug redis \
    && docker-php-ext-enable apcu xdebug redis \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-install zip xml \
    # Clean up APT cache to reduce image size
    && rm -rf /var/lib/apt/lists/*

# Copy custom configuration files
COPY php/php-fpm.d/docker.conf /usr/local/etc/php-fpm.d/zz-docker.conf
COPY php/conf.d/*.ini /usr/local/etc/php/conf.d/
COPY php/php.ini /usr/local/etc/php/php.ini
COPY nginx/h5bp /etc/nginx/h5bp

# Install Composer
COPY php/composer-installer.sh /usr/local/bin/composer-installer
RUN chmod +x /usr/local/bin/composer-installer \
    && /usr/local/bin/composer-installer \
    && mv composer.phar /usr/local/bin/composer \
    && chmod +x /usr/local/bin/composer \
    && composer --version

# Copy the application
COPY --chown=www-data:www-data .. /var/www/html

# Expose HTTP port
EXPOSE 80

# Copy the startup script
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Use the startup script as the default CMD
CMD ["/usr/local/bin/start.sh"]

