import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    const brokers = (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(',');
    this.kafka = new Kafka({
      clientId: 'pendapatan-service',
      brokers,
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.producer.connect();
      this.logger.log('Kafka producer terhubung');
    } catch (err) {
      this.logger.warn('Kafka producer gagal connect (akan retry saat kirim):', (err as Error).message);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
  }

  /**
   * Kirim pesan ke topic Kafka. Fire-and-forget; error hanya di-log.
   */
  async emit(topic: string, payload: object | string): Promise<void> {
    const value = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const record: ProducerRecord = {
      topic,
      messages: [{ value }],
    };
    // Debug: log sebelum produce
    const payloadPreview = value.length > 400 ? `${value.slice(0, 400)}...` : value;
    this.logger.debug(
      `[Kafka produce] topic="${topic}" size=${value.length} bytes, payload: ${payloadPreview}`,
    );
    try {
      await this.producer.send(record);
      this.logger.debug(`[Kafka produce] OK topic="${topic}" message terkirim`);
    } catch (err) {
      this.logger.error(
        `[Kafka produce] GAGAL topic="${topic}" payload_preview=${payloadPreview.slice(0, 100)}... err=${(err as Error).message}`,
      );
    }
  }
}
